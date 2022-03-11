let mobileConfig = require('lighthouse/lighthouse-core/config/lr-mobile-config');

if (mobileConfig.settings.skipAudits) {
  delete mobileConfig.settings.skipAudits;
}

mobileConfig.settings.onlyAudits = ['first-contentful-paint',
  'largest-contentful-paint',
  'max-potential-fid',
  'total-blocking-time',
  'cumulative-layout-shift',
  'interactive'
];
mobileConfig.settings.onlyCategories = ['performance'];

module.exports = mobileConfig;