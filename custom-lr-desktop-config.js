let desktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config');

if (desktopConfig.settings.skipAudits) {
    delete desktopConfig.settings.skipAudits;
}

desktopConfig.settings.onlyAudits = ['is-on-https'];
desktopConfig.settings.onlyCategories = ['performance'];

module.exports = desktopConfig;