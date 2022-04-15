let desktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config');

// if (desktopConfig.settings.skipAudits) {
//   delete desktopConfig.settings.skipAudits;
// }

// desktopConfig.settings.onlyAudits = ['first-contentful-paint',
//   'largest-contentful-paint',
//   'max-potential-fid',
//   'total-blocking-time',
//   'cumulative-layout-shift',
//   'interactive'
// ];
desktopConfig.settings.onlyCategories = ['performance'];

module.exports = desktopConfig;