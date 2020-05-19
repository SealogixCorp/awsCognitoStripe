/*
 *  util.js in /lib
 *
 * @version   $id$ V1.0
 * @package     FlowerArchitect
 * @subpackage  app
 * @author      Sealogix Corp Developer
 * @copyright Copyright (C) 2009 - 2017  Sealogix Corp. All rights reserved.
 * @Patent Pending US 14212028
 * @link http://FlowerArchitect.com
 * This Software is for Sealogix internal use only and
 * is not intended for sale, free sharing or any other re-distribution.
 * Viloaters will be prosecuted!!
 *
 */

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

const mongoose = require('mongoose');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const utils = require('./utils');
const { ObjectId } = require('mongoose').Types;
const encryptor = require('simple-encryptor')({
  key: process.env.SIMPLE_ENCRYPTOR_KEY
});
const moment = require('moment');
const path = require('path');
const crypto = require('crypto');
const i18n = require('i18n');
const Group = require('../models/group');
const Token = require('../models/Token');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

exports.errors = function (errors) {
  const keys = Object.keys(errors);
  const errs = [];

  // if there is no validation error, just display a generic error
  if (!keys) {
    return ['Oops! There was an error'];
  }

  keys.forEach((key) => {
    errs.push(errors[key].message);
  });

  return errs;
};

/**
 * Index of object within an array
 *
 * @param {Array} arr
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.indexof = function (arr, obj) {
  let index = -1; // not found initially
  const keys = Object.keys(obj);
  // filter the collection with the given criterias
  const result = arr.filter((doc, idx) => {
    // keep a counter of matched key/value pairs
    let matched = 0;

    // loop over criteria
    for (let i = keys.length - 1; i >= 0; i--) {
      if (doc[keys[i]] === obj[keys[i]]) {
        matched++;

        // check if all the criterias are matched
        if (matched === keys.length) {
          index = idx;
          return idx;
        }
      }
    }
  });
  return index;
};

/**
 * Find object in an array of objects that matches a condition
 *
 * @param {Array} arr
 * @param {Object} obj
 * @param {Function} cb - optional
 * @return {Object}
 * @api public
 */

exports.findByParam = function (arr, obj, cb) {
  const index = exports.indexof(arr, obj);
  if (~index && typeof cb === 'function') {
    return cb(undefined, arr[index]);
  } if (~index && !cb) {
    return arr[index];
  } if (!~index && typeof cb === 'function') {
    return cb('not found');
  }
  // else undefined is returned
};

/**
 * errLog Custom Error for FloweArchitect
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errLog = function (req, res, location, err, send) {
  if (req && req.user) {
    var userId = req.user._id;
  } else {
    var userId = 'guest';
  }
  console.log(`Error: at ${location}, user: ${userId}`, err);
  if (res && res.headerSent) {
    if (send === true && res.headerSent !== true) {
      res.send({ success: false, msg: `Error: at ${location}`, err });
    }
  }
};

/**
 * nextRevision Custom Error for FloweArchitect
 *
 * @param string revision
 * @return string
 * @api public
 */

exports.nextRevision = function (revision) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const { length } = revision;
  const valueOfLastCharacter = revision[length - 1];
  const indexOfLastCharacter = alphabet.indexOf(valueOfLastCharacter);

  if (valueOfLastCharacter === 'Z')
  // convert revision Z to revision AA  or revision AZ to AAA the next reverion
  {
    switch (length) {
      case 1:
        return 'AA'; // move to 2 characters
        break;
      case 2: // move from AZ to BA up to ZZ
        var firstCharacter = revision[0];
        if (firstCharacter === 'Z') {
        // last 2 character so move to 3 character AAA
          return 'AA';
        }
        var indexOfFirstCharacter = alphabet.indexOf(firstCharacter);
        return `${alphabet[indexOfFirstCharacter + 1]}A`; // go from AZ to BA

        break;
      case 3: // then 3 characters starting with AAA
        var firstCharacter = revision[0];
        var secondCharacter = revision[1];
        if (secondCharacter === 'Z') {
          if (firstCharacter === 'Z') {
            return 'A'; // start over
          }
          var indexOfFirstCharacter = alphabet.indexOf(firstCharacter);
          revision = `${alphabet[indexOfFirstCharacter + 1]}AA`;
          return revision; // go from AZZ to BAA
        }
        var indexOfSecondCharacter = alphabet.indexOf(secondCharacter);
        revision[1] = alphabet[indexOfSecondCharacter + 1];
        return revision; // go from A to B or AA to AB

        break;
    }
  } else {
    revision[length - 1] = alphabet[indexOfLastCharacter + 1];
    return revision; // go from A to B or AA to AB
  }
};


// check to see if object is empty.
exports.isEmptyObject = function (obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
};

// check to see if object is empty.
exports.loadTranslationsText = function (req, res, returnData) {
  translations = {
    LANGUAGE_MANAGEMENT: i18n.__('LANGUAGE_MANAGEMENT'),
    LANGUAGE: i18n.__('LANGUAGE'),
    CHINESE: i18n.__('CHINESE'),
    DANISH: i18n.__('DANISH'),
    DUTCH: i18n.__('DUTCH'),
    ENGLISH: i18n.__('ENGLISH'),
    FARSI_PERSIAN: i18n.__('FARSI_PERSIAN'),
    FINNISH: i18n.__('FINNISH'),
    FRENCH: i18n.__('FRENCH'),
    GERMAN: i18n.__('GERMAN'),
    ITALIAN: i18n.__('ITALIAN'),
    JAPANESE: i18n.__('JAPANESE'),
    KOREAN: i18n.__('KOREAN'),
    LANGUAGE: i18n.__('LANGUAGE'),
    POLISH: i18n.__('POLISH'),
    RUSSIAN: i18n.__('RUSSIAN'),
    SPANISH: i18n.__('SPANISH'),
    VIETNAMESE: i18n.__('VIETNAMESE')
  };
  // add header translation data
  for (const key in translations) {
    if (translations.hasOwnProperty(key)) {
      returnData[key] = translations[key];
    }
  }
  return returnData;
};

// check to see if object is empty.
exports.loadHeaderText = function (req, res, returnData) {
  const headerText = {
    ACCOUNT_MANAGEMENT: i18n.__('ACCOUNT_MANAGEMENT'),
    ARRANGE_FLOWERS: i18n.__('ARRANGE_FLOWERS'),
    CONTACT: i18n.__('CONTACT'),
    CREATE_FREE_ACCOUNT: i18n.__('CREATE_FREE_ACCOUNT'),
    FLOWER_IMAGES_ON_THIS_SITE_ARE_COPYRIGHTED_AND_FOR_USE_ONLY_IN_CREATING_FLOWER_ARRANGEMENTS_ON_THE_FLOWER_ARCHITECT_COM_WEB_SITE: i18n.__('FLOWER_IMAGES_ON_THIS_SITE_ARE_COPYRIGHTED_AND_FOR_USE_ONLY_IN_CREATING_FLOWER_ARRANGEMENTS_ON_THE_FLOWER_ARCHITECT_COM_WEB_SITE'),
    FLOWER_PUZZLE_GAME: i18n.__('FLOWER_PUZZLE_GAME'),
    FORUM: i18n.__('FORUM'),
    HOME: i18n.__('HOME'),
    HOME_PAGE: i18n.__('HOME_PAGE'),
    INFORMATION: i18n.__('INFORMATION'),
    LANGUAGE: i18n.__('LANGUAGE'),
    LANGUAGE_MANAGEMENT: i18n.__('LANGUAGE_MANAGEMENT'),
    LOGIN: i18n.__('LOGIN'),
    LOGIN: i18n.__('LOGIN'),
    LOGOUT: i18n.__('LOGOUT'),
    MY_ACCOUNT: i18n.__('MY_ACCOUNT'),
    MY_GROUPS: i18n.__('MY_GROUPS'),
    MY_MEMBERSHIP: i18n.__('MY_MEMBERSHIP'),
    PRICING: i18n.__('PRICING'),
    SEALOGIX_CORP_ALL_RIGHTS_RESERVED_PATENT_PENDING_US: i18n.__('© 2017_SEALOGIX_CORP_ALL_RIGHTS_RESERVED_PATENT_PENDING_US_14212028'),
    SHOP: i18n.__('SHOP'),
    TRY_IT_AS_GUEST: i18n.__('TRY_IT_AS_GUEST'),
    UPGRADE_MEMBERSHIP: i18n.__('UPGRADE_MEMBERSHIP')
  };

  // add header translation data
  for (const key in headerText) {
    if (headerText.hasOwnProperty(key)) {
      returnData[key] = headerText[key];
    }
  }
  if (req.user) {
    returnData.USERNAME =
      // encryptor.decrypt(req.user.profile.name) ||
    //     //       // encryptor.decrypt(req.user.username) ||
    //     //       // encryptor.decrypt(req.user.email);
      req.user.profile.name
      || req.user.username
      || req.user.email;
  } else {
    returnData.USERNAME = i18n.__('GUEST');
  }

  return returnData;
};

/**
 * Add User to group
 */

exports.addUser = function (req, res, user, groupId, userByInvitation) {
  // .todo RMS send name

  Group.findOne({ _id: ObjectId(groupId) }, (err, group) => {
    if (err) {
      utils.errLog(req, res, 'utils.addUser.1', err, false);
      return `{success: false, err:${err}}`;
    }
    // update users in group
    User.updateOne({ _id: ObjectId(user._id) },
      {
        $addToSet: {
          groups: {
            gid: groupId,
            ona: group.ona,
            tit: group.tit
          }
        }
      },
      (err) => {
        if (err) {
          utils.errLog(req, res, 'utils.addUser.2', err, false);
          return `{success: false, err:${err}}`;
        }
        const mna = encryptor.encrypt(req.user.profile.name); // .ToDo RMS hashed to match encrypted User profile or data from cognito

        Group.update({ _id: group._id },
          {
            $addToSet: {
              mem: {
                mid: user._id,
                mna, // encrypted
                eml: crypto
                  .createHash('md5')
                  .update(user.email)
                  .digest('hex'), // hashed
                encryptedEmail: encryptor.encrypt(req.user.email) // encrypted
              }
            }
          },
          (err) => {
            if (err) {
              utils.errLog(req, res, 'utils.addUser.3', err, false);
              return `{success: false, err:${err}}`;
            } if (userByInvitation) {
              Group.update({ _id: ObjectId(group._id) },
                { $pull: { inv: { eml: user.email } } },
                (err) => {
                  if (err) {
                    utils.errLog(req, res, 'utils.addUser.4', err, true);
                  } else {
                    res.redirect(`/group/${group._id}`);
                  }
                });
            } else {
              res.redirect(`/group/${group._id}`);
            }
          });
      });
  });
};

exports.getName = function (req, res, user) {
  let nam = '';
  if (user.profile.encryptedFirstname) {
    nam = encryptor.decrypt(user.profile.encryptedFirstname);
  }
  if (user.profile.encryptedLastname) {
    if (nam) {
      nam += ` ${encryptor.decrypt(user.profile.encryptedLastname)}`;
    } else {
      nam = encryptor.decrypt(user.profile.encryptedLastname);
    }
  }
  if (!nam) {
    nam = encryptor.decrypt(user.encryptedUserName);
  }
  return encryptor.encrypt(nam);
};

exports.checkTokenSent = function (req, res, user) {
  // Find a matching token
  Token.findOne({ _userId: ObjectId(user._id) },
    {},
    { sort: { createdAt: -1 } },
    (err, token) => {
      if (err) {
        utils.errLog(req, res, 'users.postLogin.2', err, true);
      } else {
        console.log(token);
        if (!token || moment().diff(moment(token.createdAt), 'days') > 1) {
          // resend daily if they try to login and not verified

          // Create a verification token for this user
          const newToken = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex'),
            newHashEmail: user.email,
            newEncryptedEmail: user.encryptedEmail
          });

          // Save the verification token
          newToken.save((err) => {
            if (err) {
              utils.errLog(req, res, 'users.postLogin.3', err, true);
            } else {
              let toRecipient = user.email;
              if (!user.legacyLogin) {
                toRecipient = encryptor.decrypt(user.encryptedEmail);
              }
              // send email verification
              const mailOptions = {
                to: toRecipient,
                from: 'flowerarchitect@gmail.com',
                subject: i18n.__('PLEASE_CONFIRM_YOUR_EMAIL_TO_COMPLETE_YOUR_REGISTATION_TO_FLOWERARCHITECT_COM'),
                html:
                  `<a target=_blank  href='https://flowerarchitect.com/confirmation/${
                    newToken.token
                  }'> ${
                    i18n.__('COMFIRM_YOUR_EMAIL')
                  }</a>` // "<a target=_blank  href='https://flowerarchitect.com/confirmation?authToken\'" + i18n.__('COMFIRM_YOUR_EMAIL') + "add add token here</a>"
              };
              transporter.sendMail(mailOptions, (err) => {
                if (err) {
                  utils.errLog(req, res, 'users.postLogin.4', err, true);
                } else {
                  req.flash('errors', {
                    msg: i18n.__('EMAIL_VERIFICATION_SENT_TO_YOUR_EMAIL_ADDRESS')
                  });
                  res.redirect('/login');
                }
              });
            }
          });
        } else {
          req.flash('errors', {
            msg: i18n.__('YOUR_ACCOUNT_HAS_NOT_BEEN_VERIFIED')
          });
          res.redirect('/login');
        }
      }
    });
};
