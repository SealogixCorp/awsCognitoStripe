/*
 *  groups.js in FlowerArchitect/arranger/app/arranger/controllers
 *
 * @version   $id$ V1.0
 * @package     FlowerArchitect
 * @subpackage  app
 * @author      Sealogix Corp Developer
 * @copyright Copyright (C) 2009 - 2017 Sealogix Corp. All rights reserved.
 * @Patent Pending US 14212028
 * @link http://FlowerArchitect.com
 * This Software is for Sealogix internal use only and
 * is not intended for sale, free sharing or any other re-distribution.
 * Viloaters will be prosecuted!!
 *
 */

/**
 * Module dependencies.
 */

var User = require('../models/User');
var https = require('https');
var http = require('http');
var _this = this;
const crypto = require('crypto');

var mongoose = require('mongoose'),
  Group = require('../models/group'),
  utils = require('../lib/utils'),
  encryptor = require('simple-encryptor')({
    key: process.env.SIMPLE_ENCRYPTOR_KEY
  }),
  nodemailer = require('nodemailer'),
  handlebars = require('handlebars'),
  fs = require('fs-extended'),
  path = require('path'),
  moment = require('moment'),
  ObjectId = require('mongoose').Types.ObjectId,
  uniqid = require('uniqid'),
  i18n = require('i18n');

/**
 * GET /groups of all groups
 *
 */
exports.getGroups = function (req, res, next) {
  console.log('got to getGroups');
  moment().format('YYYY MM DD');
  var object = {};
  var now = moment();
  Group.find({}, function (err, groups) {
    if (err) {
      utils.errLog(req, res, 'groups.getGroups.1', err, true);
    } else {
      if (groups) {
        groups.forEach(function (group) {
          group.ona = encryptor.decrypt(groupData[i].ona);
          for (i = 0; i < group.mem.length; i++) {
            group.mem.mNa = encryptor.decrypt(group.mem.mNa);
            group.mem.eml = encryptor.decrypt(group.mem.encryptedEmail);
            delete group.mem.encryptedEmail;
          }
          for (i = 0; i < group.inv.length; i++) {
            group.inv.eml = encryptor.decrypt(group.inv.encryptedEmail);
            delete group.inv.encryptedEmail;
          }
        });
        // .todo unencrypt name and email and limit fields
        var returnData = {
          NAME: i18n.__('NAME'),
          CATEGORY: i18n.__('CATEGORY'),
          OWNER: i18n.__('OWNER'),
          MEMBERS: i18n.__('MEMBERS'),
          LAST_ACTIVE: i18n.__('LAST_ACTIVE')
        };
        returnData = utils.loadHeaderText(req, res, returnData);
        returnData = utils.loadTranslationsText(req, res, returnData);
        res.send({success: true}, groups);
      } else {
        res.send({success: false, error: 'Groups not found'});
      }
    }
  });
};

/**
 * Load Groups
 */

exports.getGroupsList = function(req, res, next) {
  const userId = req.param("userId");
  const groupId = req.param("groupId");
  const groupTit = req.param("groupTit");
  const groupOwner = req.param("groupOwner");
  const groupLas = req.param("groupLas");
  const start = parseInt(req.param("start"));
  const page = parseInt(req.param("page"));
  const limit = parseInt(req.param("limit"));

  const obj = {};
  if (userId) {
    obj.mem = { $elemMatch: { mid: ObjectId(userId) } };
  }
  if (groupId) {
    obj._id = ObjectId(groupId);
  }
  if (groupTit) {
    obj.tit = groupTit;
  }
  if (groupOwner) {
    obj.oNa = groupOwner;
  }
  if (groupLas) {
    obj.las = groupLas;
  }
  // console.log(obj);
  const fields = {
    tit: 1,
    oNa: 1,
    des: 1,
    cat: 1,
    mem: 1,
    las: 1,
    cre: 1
  };

  // collection.find().skip(pageSize*(pageNum-1)).limit(pageSize);
  Group.find(obj, fields, (err, groups) => {
    if (err) {
      utils.errLog(req, res, "administrators.getGroupsList.1", err, true);
    }
    res.send(groups);
    // }).sort({'username': 1});
  })
    .sort({ cre: -1 })
    .skip(limit * start)
    .limit(limit);
};

/**
 * Load detailed group data
 */

exports.getGroupData = function(req, res, next) {
  // .todo decrypt data
  const groupId = req.param("groupId");
  const obj = { _id: groupId };

  Group.findOne(obj, (err, group) => {
    if (err) {
      utils.errLog(req, res, "administrators.getGroupData.1", err, true);
    }
    if (group) {
      if (req.user && groupData.mem.length) {
        for (var i = 0; i < groupData.mem.length; i++) {
          if (req.user._id.equals(groupData.mem[i].mid)) {
            userFound = true;
          }
        }
        if (userFound === true) {
          if (req.user._id.equals(groupData.oid)) {
            returnData.groupOwner = true;
          }
          returnData.groupData = {
            gid: groupData._id,
            cat: groupData.cat,
            tit: groupData.tit,
            des: groupData.des,
            oNa: encryptor.decrypt(groupData.oNa),
            mem: groupData.mem
          };
          if (returnData.groupOwner) {
            returnData.groupData.inv = groupData.inv;
          }

          for (var i = 0; i < groupData.mem.length; i++) {
            returnData.groupData.mem[i].mNa = encryptor.decrypt(
              groupData.mem[i].mNa
            );
            returnData.groupData.mem[i].eml = encryptor.decrypt(
              groupData.mem[i].encryptedEmail
            );
            delete returnData.groupData.mem[i].encryptedEmail;
            returnData.groupData.mem[i].lasActive = moment(
              groupData.mem[i].las
            ).format("YYYY-MM-DD");
          }
          if (config.loginFrom === "mobile") {
            res.send({ success: true, data: returnData, callViewURL: "group" });
          } else {
            res.render("groups/group", returnData);
          }
        } else {
          res.send({
            success: false,
            error: "Current User not Member of Group"
          });
        }
      }
    } else {
      res.send({ success: false, error: "GroupId not found" });
    }

    // }).sort({'username': 1});
  });
};

/**
 * GET /getMygroups for user
 *
 */
exports.getMygroups = function (req, res, next) {
  console.log('got to getMyGroups');
  // moment().format('YYYY MM DD');
  // var object = {};
  // var now = moment();
  var returnData = {
    title: i18n.__('MY_GROUPS'),
    MY_GROUPS: i18n.__('MY_GROUPS'),
    CREATE_GROUP: i18n.__('CREATE_GROUP'),
    EDIT_GROUP: i18n.__('EDIT_GROUP'),
    DELETE_GROUP: i18n.__('DELETE_GROUP'),
    ARE_YOU_A_HUMAN: i18n.__('ARE_YOU_A_HUMAN'),
    NAME: i18n.__('NAME'),
    CATEGORY: i18n.__('CATEGORY'),
    OWNER: i18n.__('OWNER'),
    MEMBERS: i18n.__('MEMBERS'),
    LAST_ACTIVE: i18n.__('LAST_ACTIVE'),
    PLEASE_SELECT_GROUP_TO_DELETE: i18n.__('PLEASE_SELECT_GROUP_TO_DELETE'),
    PLEASE_SELECT_GROUP_TO_EDIT: i18n.__('PLEASE_SELECT_GROUP_TO_EDIT')
  };

  var groups = [
    {
      id: '5baf2582d4e714382632d12a',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '1',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '1',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '1',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '1',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '1',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '2',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    },
    {
      id: '3',
      tit: 'testTitle',
      cat: 'General',
      ona: 'OwnerName',
      number: '22',
      las: '7/9/2018'
    }
  ];

  var object = {};
  var now = moment();

  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);
  returnData.csrf = res.locals._csrf;
  returnData.groupOwner = false;

  User.find({_id: ObjectId(req.user._id)}, {groups: 1}, function (
    err,
    groups
  ) {
    if (err) {
      utils.errLog(req, res, 'users.getAccountGroups.1', err, true);
    } else {
      // find in
      var fields = {
        gid: 1,
        cat: 1,
        tit: 1,
        // des: 1,
        ona: 1,
        mem: 1,
        cre: 1,
        las: 1
      };
      if (groups.length) {
        Group.find({_id: {$in: groups.gid}}, fields, function (
          error,
          groupData
        ) {
          if (err) {
            utils.errLog(req, res, 'users.getAccountGroups.2', err, true);
          } else {
            for (i = 0; i < groupData.length; i++) {
              groupData[i].ona = encryptor.decrypt(groupData[i].ona);
              groupData.nbr = groupData.mem.length;
              delete groupData.mem;
            }
            if (req.user._id.equals(groupData.oid)) {
              returnData.groupOwner = true;
            }
            // console.log('render');
            // res.render('groups/mygroups', {csrf: res.locals._csrf, groups: groups, returnData});
            // res.render('groups/mygroups', {csrf: res.locals._csrf, groups: groupData, returnData});
          }
        });
      }
    }
  });
  returnData.groups = groups;
  res.render('groups/mygroups', returnData);
};

/**
 * Load group Invites
 */

exports.getGroupInvites = function(req, res, next) {
  const groupId = req.param("groupId");
  const obj = { _id: groupId };

  Group.findOne(obj, { inv: 1 }, (err, group) => {
    if (err) {
      utils.errLog(req, res, "administrators.getGroupMembers.1", err, true);
    }
    if (group) {
      var returnData = group.inv;
      for (var i = 0; i < returnData.length; i++) {
        returnData[i].eml = encryptor.decrypt(returnData[i].encryptedEmail);
        delete returnData[i].encryptedEmail;
      }
      res.send(returnData);
    } else {
      res.send({ success: false, error: "Members not found" });
    }
    // }).sort({'username': 1});
  });
};

/**
 * Load group Members
 */

exports.getGroupMembers = function(req, res, next) {
  const groupId = req.param("groupId");
  const obj = { _id: groupId };

  Group.findOne(obj, { mem: 1 }, (err, group) => {
    if (err) {
      utils.errLog(req, res, "administrators.getGroupMembers.1", err, true);
    }
    if (group.mem) {
      var returnData = group.mem;
      for (var i = 0; i < returnData.length; i++) {
        returnData[i].mNa = encryptor.decrypt(returnData.mNa);
        returnData[i].eml = encryptor.decrypt(returnData.encryptedEmail);
        delete returnData[i].encryptedEmail;
      }
      res.send(returnData);
    } else {
      res.send({ success: false, error: "Members not found" });
    }
    // }).sort({'username': 1});
  });
};

/**
 * GET /getGroup if user has access
 *
 */
exports.getGroup = function (req, res, next) {
  var groupId = req.param('groupId');
  console.log('group id');
  console.log(groupId);
  // moment().format('YYYY MM DD');
  // var object = {};
  // var now = moment();
  var returnData = {
    title: i18n.__('GROUP_DATA'),
    GROUP_DATA: i18n.__('GROUP_DATA'),
    ARE_YOU_A_HUMAN: i18n.__('ARE_YOU_A_HUMAN'),
    INVITE_NEW_MEMBER: i18n.__('INVITE_NEW_MEMBER'),
    DELETE_MEMBER: i18n.__('DELETE_MEMBER'),
    ARE_YOU_A_HUMAN: i18n.__('ARE_YOU_A_HUMAN'),
    NAME: i18n.__('NAME'),
    EMAIL: i18n.__('EMAIL'),
    CATEGORY: i18n.__('CATEGORY'),
    CREATED: i18n.__('CREATED'),
    OWNER: i18n.__('OWNER'),
    MEMBERS: i18n.__('MEMBERS'),
    INVITATIONS: i18n.__('INVITATIONS'),
    GROUP_MEMBERS: i18n.__('GROUP_MEMBERS'),
    LAST_ACTIVE: i18n.__('LAST_ACTIVE'),
    TIMES_INVITED: i18n.__('TIMES_INVITED'),
    LAST_INVITED: i18n.__('LAST_INVITED')
  };

  var groupData = {
    tit: 'my group',
    des:
      'my group description d    llllllllllllllllll llllllllllllll llllllllllll llllllllllll ',
    cat: 'group category',
    ona: 'joe smith',
    cre: '7/9/54',
    las: '2/2/18'
  };
  groupData.mem = [
    {
      mid: 1,
      tit: 'testTitle',
      eml: 'test@gmail.com',
      mcr: 'General',
      mNa: 'OwnerName',
      las: '7/9/2018'
    },
    {
      mid: 2,
      tit: 'testTitle',
      eml: 'test@gmail.com',
      mcr: 'General',
      mNa: 'OwnerName',
      las: '7/9/2018'
    },
    {
      mid: 3,
      tit: 'testTitle',
      eml: 'test@gmail.com',
      mcr: 'General',
      mNa: 'OwnerName',
      las: '7/9/2018'
    }
  ];

  groupData.inv = [
    {
      iid: 1,
      eml: 'test1@gmail.com',
      nIv: 1,
      las: '7/9/2018'
    },
    {
      iid: 2,
      eml: 'test2@gmail.com',
      nIv: 1,
      las: '7/9/2018'
    },
    {
      iid: 3,
      eml: 'test3@gmail.com',
      nIv: 2,
      las: '7/9/2018'
    }
  ];
  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);
  returnData.csrf = res.locals._csrf;
  returnData.groupOwner = false;

  var object = {};
  var now = moment();
  var userId = req.param('userId');
  if (groupId) {
    var fields = {
      gid: 1,
      cat: 1,
      tit: 1,
      des: 1,
      oid: 1,
      gTyp: 1,
      ona: 1,
      mem: 1,
      inv: 1,
      cre: 1,
      las: 1
    };
    if (ObjectId.isValid(groupId)) {
      Group.findOne({_id: ObjectId(groupId)}, fields, function (
        error,
        groupData
      ) {
        if (error) {
          utils.errLog(req, res, 'users.getAccountGroups.2', error, true);
        } else {
          // Check to see if user is part of group
          var userFound = false;
          if (groupData) {
            if (req.user && groupData.mem.length) {
              for (var i = 0; i < groupData.mem.length; i++) {
                if (req.user._id.equals(groupData.mem[i].mid)) {
                  userFound = true;
                }
              }
              if (userFound === true) {
                if (req.user._id.equals(groupData.oid)) {
                  returnData.groupOwner = true;
                }
                returnData.groupData = {
                  gid: groupData._id,
                  cat: groupData.cat,
                  tit: groupData.tit,
                  des: groupData.des,
                  ona: encryptor.decrypt(groupData.ona),
                  mem: groupData.mem
                };
                if (returnData.groupOwner) {
                  returnData.groupData.inv = groupData.inv;
                }

                for (var i = 0; i < groupData.mem.length; i++) {
                  returnData.groupData.mem[i].mNa = encryptor.decrypt(
                    groupData.mem[i].mNa
                  );
                  returnData.groupData.mem[i].eml = encryptor.decrypt(
                    groupData.mem[i].encryptedEmail
                  );
                  delete returnData.groupData.mem[i].encryptedEmail;
                  returnData.groupData.mem[i].lasActive = moment(
                    groupData.mem[i].las
                  ).format('YYYY-MM-DD');
                }
                res.render('groups/group', returnData);
              } else {
                res.send({
                  success: false,
                  error: 'Current User not Member of Group'
                });
              }
            }
          } else {
            res.send({success: false, error: 'GroupId not found'});
          }
        }
      });
    }
  }
};

/**
 * GET /getCreateGroup if user has access
 *
 */
exports.getCreateGroup = function (req, res, next) {
  var returnData = {
    title: 'Create Group',
    CREATE_GROUP: i18n.__('CREATE_GROUP'),
    NAME: i18n.__('NAME'),
    GROUP_NAME: i18n.__('GROUP_NAME'),
    DESCRIPTION: i18n.__('DESCRIPTION'),
    CATEGORY: i18n.__('CATEGORY'),
    WEBSITE: i18n.__('WEBSITE'),
    WEBSITE_URL: i18n.__('WEBSITE_URL'),
    SUBMIT: i18n.__('SUBMIT')
  };
  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);
  returnData.csrf = res.locals._csrf;
  res.render('groups/createGroup', returnData);
};

/**
 * Post Create a group
 */

exports.postCreateGroup = function (req, res) {
  var tit = req.param('tit');
  var cat = req.param('cat');
  var des = req.param('des');
  var web = req.param('web');

  var obj = {
    oid: req.user._id,
    // ona: req.user.profile.name,
    tit: tit,
    des: des,
    cat: cat,
    web: web
  };

  obj.ona = encryptor.encrypt(req.user.profile.name); // .ToDo RMS encrypted to match encrypted User profile or data from cognito

  var group = new Group(obj);
  group.save(function (err, newGroup) {
    if (err) {
      utils.errLog(req, res, 'groups.createGroup.1', err, true);
    } else {
      // add owner to group and to  user id
      utils.addUser(req, res, req.user, newGroup._id, false);
    }
  });
};

/**
 * Post Update a group
 */

exports.postUpdateGroup = function (req, res) {
  var tit = req.param('tit');
  var cat = req.param('cat');
  var des = req.param('des');
  var web = req.param('web');

  var obj = {
    oid: req.user._id,
    // ona: req.user.profile.name,
    tit: tit,
    des: des,
    cat: cat,
    web: web
  };

  obj.ona = encryptor.encrypt(req.user.profile.name); // .ToDo RMS encrypted to match encrypted User profile or data from cognito

  var group = new Group(obj);
  group.save(function (err, newGroup) {
    if (err) {
      utils.errLog(req, res, 'groups.createGroup.1', err, true);
    } else {
      // add owner to group and to  user id
      utils.addUser(req, res, req.user, newGroup._id, false);
    }
  });
};

/**
 * Delete an group
 */

exports.deleteGroup = function (req, res) {
  var groupId = req.param('groupId');
  var data = req.param('data');

  Group.findOne({_id: ObjectId(groupId)}, function (err, group) {
    if (err) {
      utils.errLog(req, res, 'groups.deleteGroup.1', err, true);
    } else {
      // Check to make sure current user is owner of group
      if (group.oid.equals(req.user._id)) {
        // remove all users from group
        User.update({}, {$pull: {groups: {gid: group._id}}}, function (
          err
        ) {
          if (err) {
            utils.errLog(req, res, 'groups.deleteGroup.2', err, true);
          } else {
            group.remove({_id: ObjectId(group._id)}, function (err) {
              if (err) {
                utils.errLog(req, res, 'groups.deleteGroup.3', err, true);
              } else {
                res.send({success: true});
              }
            });
          }
        });
      }
    }
  });
};

// /**
//  * Update group
//  */
// exports.updateGroup = function (req, res) {
//   var groupId = req.param('groupId');
//   var userId = req.param('userId');
//   var data = req.param('data');
//
//   Group.findOne({_id: ObjectId(groupId)}, function (err, group) {
//     if (err) {
//       utils.errLog(req, res, 'groups.updateGroup.1', err, true);
//     } else {
//       if (req.user._id.equals(group.oId)) {
//       User.findOne({_id: userId}, function (err, mongoUser) {
//         if (err) {
//           utils.errLog(req, res, 'groups.updateGroup.2', err, true);
//         } else {
//           // check to see if owner needs updated .todo see if I need to covert
//           var obj = {
//             // _id: groupId,
//             // oid: mongoUser._id,
//             // ona: mongoUser.nam,
//             tit: data.tit,
//             des: data.des,
//             cat: data.cat
//           };
//           Group.update({_id: ObjectId(group._id)}, obj, function (err) {
//             if (err) {
//               utils.errLog(req, res, 'groups.updateGroup.3', err, true);
//             } else {
//               if (mongoUser._id.equals(group.oid)) {
//                 // check to see if new owner is group member and if not add him
//                 Group.findOne({
//                   _id: ObjectId(group._id),
//                   mem: {mid: mongoUser._id}
//                 }, function (err, groupUser) {
//                   if (err) {
//                     utils.errLog(req, res, 'groups.updateGroup.4', err, true);
//                   } else {
//                     if (!groupUser) {
//                       req.body = {name: groupUser.profile.name};
//                       req.params.joomlaGroupId = group.joomlaGroupId;
//                       req.params.joomlaUserId = groupUser.joomla.joomlaUserId;
//                       _this.addUser(req, res);
//                     }
//                   }
//                 });
//               }
//             }
//           });
//         }
//       });
//     }
//     }
//   });
// };

/**
 *  getGroupInvite Invite to a group
 */

exports.getGroupInvite = function (req, res) {
  var groupId = req.param('groupId');

  // moment().format('YYYY MM DD');
  // var object = {};
  // var now = moment();
  var returnData = {
    title: i18n.__('INVITE_TO_GROUP'),
    INVITE_NEW_MEMBER_TO_GROUP: i18n.__('INVITE_NEW_MEMBER_TO_GROUP'),
    CATEGORY: i18n.__('CATEGORY'),
    ENTER_EMAIL_ADDRESS: i18n.__('ENTER_EMAIL_ADDRESS'),
    EMAIL_SAMPLE: i18n.__('EMAIL_SAMPLE'),
    SEND_EMAIL_INVITATION: i18n.__('SEND_EMAIL_INVITATION')
  };

  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);
  returnData.csrf = res.locals._csrf;

  var userId = req.param('userId');
  if (groupId) {
    var fields = {
      gid: 1,
      tit: 1,
      cat: 1,
      des: 1,
      oid: 1,
      gTyp: 1
    };
    if (ObjectId.isValid(groupId)) {
      Group.findOne({_id: ObjectId(groupId)}, fields, function (
        error,
        groupData
      ) {
        if (error) {
          utils.errLog(req, res, 'groups.getGroupInvite.1', error, true);
        } else {
          if (req.user._id.equals(groupData.oid)) {
            // only group owner can make invites
            returnData.groupData = {
              gid: groupData._id,
              cat: groupData.cat,
              tit: groupData.tit,
              des: groupData.des
            };
            res.render('groups/groupInvite', returnData);
          } else {
            res.redirect('/myGroups');
          }
        }
      });
    }
  }
};

/**
 * Invitee accepts membership in group
 */

exports.postAcceptUser = function (req, res) {
  // .todo RMS send name
  var groupId = req.param('groupId');
  var invitationId = req.param('invitationId');

  var email = '';
  Group.findOne({_id: ObjectId(groupId)}, function (err, group) {
    if (err) {
      utils.errLog(req, res, 'groups.acceptUser.1', err, true);
    } else {
      for (i = 0; i < group.inv.length; i++) {
        if (group.inv[i].iid === invitationId) {
          // group.inv[i].iId = group.inv[i].eml;
          // email = crypto.createHash('md5').update(encryptor.decrypt(group.inv[i].eml)).digest('hex');
          email = group.inv[i].eml;
        }
      }
      if (email) {
        User.findOne({email: email}, function (err, mongoUser) {
          if (err) {
            utils.errLog(req, res, 'groups.acceptUser.2', err, true);
          } else {
            if (mongoUser) {
              utils.addUser(req, res, mongoUser, groupId, true);
            } else {
              return res.redirect('/signup');
            }
          }
        });
      } else {
        res.send({success: true, err: i18n._('INVITATION_NOT_FOUND')}); // .todo RMS figure out how to send back message to url cli
      }
    }
  });
};

/**
 * Invite User to group
 */

exports.postInviteUser = function (req, res) {
  // .todo RMS send name
  var groupId = req.param('groupId');
  var invitedUserEmail = req.param('email');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  var now = moment();
  if (invitedUserEmail && groupId) {
    invitedUserEmail = invitedUserEmail.toLowerCase();
    // get group owners name
    // var nam = utils.getName(req, res, req.user);

    var nam = req.user.profile.name;

    Group.findOne({_id: ObjectId(groupId)}, function (err, group) {
      if (err) {
        utils.errLog(req, res, 'groups.inviteUser.1', err, true);
      } else {
        // check that logged in user is owner of group.
        if (group.oid.equals(req.user._id)) {
          var invitationId = uniqid();
          var acceptUrl = './invitation/' + group._id + '/' + invitationId;
          var existingInvitation = false;
          // check if email already invited and if it is less than 3 then update group and invite

          for (i = 0; i < group.inv.length; i++) {
            if (group.inv[i].eml == invitedUserEmail) {
              existingInvitation = true;
            }
          }
          var data = {
            acceptUrl: acceptUrl,
            nam: nam,
            tit: group.tit
          };

          if (existingInvitation == true) {
            if (group.inv[i].nIv == 3) {
              res.send({
                success: false,
                msg: i18n._('MAX_INVITE_RETRUY_EXCEEDED_WITH_NO_RESPONSE')
              });
              return;
            } else {
              group.inv[i].nIv++;
            }
          }

          // // check to see if invited user is a member and membership status.
          // var hashEmail = crypto
          //   .createHash("md5")
          //   .update(invitedUserEmail)
          //   .digest("hex");
          // User.findOne({ email: hashEmail }, function(err, mongoUser) {
          // check to see if invited user is a member and membership status.

          User.findOne({email: invitedUserEmail}, function (err, mongoUser) {
            if (err) {
              utils.errLog(req, res, 'groups.inviteUser.2', err, true);
            } else {
              if (mongoUser) {
                // if (mongoUser.member.typ == "free") {
                //   var templateName = "group_free_Invite.handlebars";
                // } else {
                var templateName = 'group_member_Invite.handlebars';
                // }
              } else {
                var templateName = 'group_non_member_Invite.handlebars';
              }

              var language = 'en';
              if (req.user.profile.language) {
                language = req.user.profile.language;
              }

              fs.readFile(
                path.resolve(
                  __dirname,
                  '../views/htmlPdf/' + language + '/' + templateName
                ),
                function (err, template) {
                  if (err) {
                    utils.errLog(req, res, 'groups.inviteUser.3', err, true);
                  } else {
                    // make the buffer into a string
                    var source = template.toString();
                    // console.log(emailId);
                    // call the render function
                    var template2 = handlebars.compile(source);
                    var outputString = template2(data);

                    var eMailData = {
                      to: invitedUserEmail,
                      subject:
                        i18n.__(
                          'YOU_HAVE_BEEN_INVITED_TO_JOIN_A_FLOWER_ARRANGING_GROUP'
                        ) +
                        group.tit +
                        i18n.__('_BY_') +
                        nam,
                      message: outputString
                    };

                    // invite user to group
                    transporter.sendMail(
                      {
                        from: 'flowerarchitect@gmail.com',
                        // to: 'rick.sturgeon@yahoo.com',
                        to: eMailData.to,
                        subject: eMailData.subject,
                        html: eMailData.message
                      },
                      function (err, info) {
                        if (err) {
                          utils.errLog(
                            req,
                            res,
                            'groups.inviteUser.4',
                            'mail not sent' + err,
                            true
                          );
                        } else {
                          Group.update(
                            {_id: ObjectId(mongoUser._id)},
                            {
                              $addToSet: {
                                inv: {
                                  gid: groupId,
                                  iid: invitationId, // invitation Id
                                  eml: crypto
                                    .createHash('md5')
                                    .update(invitedUserEmail)
                                    .digest('hex'),
                                  encryptedEmail: encryptor.encrypt(
                                    invitedUserEmail
                                  ), // invitee email
                                  las: now
                                }
                              }
                              // Person.update({'items.id': 2}, {'$set': {
                              //         'items.$.name': 'updated item2',
                              //         'items.$.value': 'two updated'
                              //     }}, function(err) { ...
                            },
                            function (err) {
                              if (err) {
                                utils.errLog(
                                  req,
                                  res,
                                  'groups.inviteUser.5',
                                  err,
                                  true
                                );
                              } else {
                                res.redirect('/group/' + groupId);
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        } else {
          utils.errLog(
            req,
            res,
            'groups.inviteUser.6',
            'You must be the group owner to add users',
            true
          );
        }
      }
    });
  }
};

/**
 * Delete Member from group
 */

exports.deleteMember = function (req, res) {
  var groupId = req.param('groupId');
  var memberId = req.param('memberId');
  Group.findOne({_id: ObjectId(groupId)}, function (err, group) {
    if (err) {
      utils.errLog(req, res, 'groups.deleteUser.1', err, true);
    } else {
      if (
        (req.user._id.equals(memberId) || req.user._id.equals(group.oid)) &&
        !group.oid.equals(memberId)
      ) {
        User.findOne({_id: ObjectId(memberId)}, function (err, mongoUser) {
          if (err) {
            utils.errLog(req, res, 'groups.deleteUser.2', err, true);
          } else {
            Group.update(
              {_id: ObjectId(group._id)},
              {$pull: {mem: {mid: mongoUser._id}}},
              function (err) {
                if (err) {
                  utils.errLog(req, res, 'groups.deleteUser.3', err, true);
                } else {
                  User.update(
                    {_id: ObjectId(mongoUser._id)},
                    {$pull: {groups: {gid: group._id}}},
                    function (err) {
                      if (err) {
                        utils.errLog(
                          req,
                          res,
                          'groups.deleteUser.4',
                          err,
                          true
                        );
                      } else {
                        res.send({success: true});
                      }
                    }
                  );
                }
              }
            );
          }
        });
      } else {
        if (group.oid.equals(memberId)) {
          res.send({
            success: false,
            msg: i18n.__('GROUP_OWNER_CAN_NOT_DELETE_THEMSELVES')
          });
        } else {
          res.send({
            success: false,
            msg: i18n.__('YOU_CAN_ONLY_DELETE_YOURSELF_FROM_THE_GROUP')
          });
        }
      }
    }
  });
};

/**
 * Delete Member from group
 */

exports.deleteInvite = function (req, res) {
  var groupId = req.param('groupId');
  var inviteId = req.param('inviteId');
  Group.update(
    {_id: ObjectId(groupId)},
    {$pull: {inv: {iid: inviteId}}},
    function (err) {
      if (err) {
        utils.errLog(req, res, 'groups.deleteInvite.1', err, true);
      } else {
        User.update(
          {_id: ObjectId(groupId)},
          {$pull: {groups: {gid: group._id}}},
          function (err) {
            if (err) {
              utils.errLog(req, res, 'groups.deleteInvite.2', err, true);
            } else {
              res.send({success: true});
            }
          }
        );
      }
    }
  );
};
