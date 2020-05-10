/*
 * Token
 *  .js in FlowerArchitect/arranger/app/arranger/models
 *
 * @version   $id$ V1.0
 * @package     FlowerArchitect
 * @subpackage  app
 * @author      Sealogix Corp Developer
 * @copyright Copyright (C) 2009 - 2018 Sealogix Corp. All rights reserved.
 * @Patent Pending US 14212028
 * @link http://FlowerArchitect.com
 * This Software is for Sealogix internal use only and
 * is not intended for sale, free sharing or any other re-distribution.
 * Viloaters will be prosecuted!!
 *
 */
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');



moment().format('YYYY MM DD');


const tokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User',  index: true},
  token: { type: String, required: true,  index: true },
  newHashEmail: { type: String, default: '' },
  newEncryptedEmail: { type: String, default: '' },
  createdAt: { type: Date, required: true, default: Date.now, expires: 500000 } // 42000
});


const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
