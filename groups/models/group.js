/*
 *  group.js in FlowerArchitect/arranger/app/arranger/models
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

var mongoose = require("mongoose"),
  env = process.env.NODE_ENV || "development",
  Schema = mongoose.Schema,
  utils = require("../lib/utils");

/**
 * Getters
 */

var getTags = function(tags) {
  return tags.join(",");
};

/**
 * Setters
 */

var setTags = function(tags) {
  return tags.split(",");
};

/**
 * Group Schema
 */

var GroupSchema = new Schema({
  tit: { type: String, default: "", trim: true }, // english title
  des: { type: String, default: "", trim: true }, // english description
  web: { type: String, default: "", trim: true }, // group web link
  ldes: [
    {
      lan: { type: String, default: "", trim: true },
      tit: { type: String, default: "", trim: true },
      des: { type: String, default: "", trim: true },    }
  ], // multi language description
  cat: { type: String, default: "", index: true, trim: true }, // categroy
  gtyp: { type: String, default: "", index: true, trim: true }, // normal or enterprisemembershipsLeft: {type: Number, default: 10}  // used for enterprise type group.
  oid: { type: Schema.ObjectId, index: true, ref: "User2" }, // id or owner of group hashed
  ona: { type: String, default: "", trim: true }, // name owner of group encrypted .ToDo change to ona
  encryptedona: { type: String, default: "", trim: true }, // name owner of group encrypted
  mem: [
    {
      // group members
      mid: { type: Schema.ObjectId, index: true, ref: "User2" }, // id of group member
      mna: { type: String, default: "" }, // encrypted member name
      eml: { type: String, index: true }, // hashed email
      encryptedEmail: { type: String }, // encrypted 2 way
      mcr: { type: Date, default: Date.now }, // created
      las: { type: Date, default: Date.now }, // last active
      tmp: { type: String } // temp txt for reformatted date
    }
  ],
  inv: [
    {
      eml: { type: String, index: true }, // hashed email
      encryptedEmail: { type: String }, // encrypted 2 way
      niv: { type: Number, default: 1 }, // number of invites
      iid: { type: String, default: "", index: true, trim: true }, // unique 18 bit number for invitation validation
      icr: { type: Date, default: Date.now }, // created
      las: { type: Date } //date invite last made
    }
  ],
  // tag: {type: [], get: getTags, set: setTags}, // tag
  cre: { type: Date, default: Date.now }, // created
  las: { type: Date, default: Date.now } // last edit
});

GroupSchema.index({ _id: 1, "mem.mid": 1 });

module.exports = mongoose.model("Group", GroupSchema);
