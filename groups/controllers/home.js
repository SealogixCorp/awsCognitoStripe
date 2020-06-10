const utils = require('../lib/utils');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  let returnData = {
    title: 'Home'
  };
  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);
  // returnData.captcha = res.recaptcha;


  res.render('account/login', returnData);
};
