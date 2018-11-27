'use strict';
var CASAuthentication = require('cas-authentication');

// See https://github.com/kylepixel/cas-authentication
module.exports = function (host, port, casUrl) {
  var cas = new CASAuthentication({
    cas_url: casUrl || 'https://secure.its.yale.edu/cas',
    service_url: '',
    cas_version: '1.0'
  });

  // Help make running on Heroku easier for students. Let's automatically
  // change the `service_url` on the first request.
  let serviceURLchecked = false;
  cas.checkServiceURL = (req, res, next) => {
    if (serviceURLchecked === false) {
      const protocol = req.secure ? 'https' : 'http'
      cas.service_url = `${protocol}://${req.headers.host}`;
      serviceURLchecked = true;
    }
    next();
  }

  return cas;
};