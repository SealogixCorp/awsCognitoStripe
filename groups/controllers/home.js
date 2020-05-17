const utils = require("../lib/utils");

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  var returnData = {
    title: "Home"
  };

  returnData = utils.loadHeaderText(req, res, returnData);
  returnData = utils.loadTranslationsText(req, res, returnData);

  res.render("account/login", returnData);

};
