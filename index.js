const { URL } = require(`url`);
const lighthouse = require('lighthouse');
const puppeteer = require(`puppeteer`);
const desktopConfig = require('lighthouse/lighthouse-core/config/lr-desktop-config');
const mobileConfig = require('lighthouse/lighthouse-core/config/lr-mobile-config');

exports.lighthouse_poc = async (req, res) => {
    console.log(`On demnand generate lhr, url: ${req.query.url}, emulatedUserAgent: ${req.query.emulatedUserAgent}`);
    const resultJson = await generateLighthouseReport(req.query.url, req.query.emulatedUserAgent);
    res.status(200).send(resultJson);
}


var generateLighthouseReport = async (url, emulatedUserAgent = 'desktop') => {
    const jobID = new Date().getTime();
    var result;
    var browser;
    var config;
    if (emulatedUserAgent == 'mobile') {
        config = mobileConfig;
    } else {
        config = desktopConfig;
    }
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const options = { output: 'json', port: (new URL(browser.wsEndpoint())).port };
        const runnerResult = await lighthouse(url, options, config);

        // `.lhr` is the Lighthouse Result as a JS object
        console.log(`jobID: ${jobID} Generated lighthouse report for, url:${runnerResult.lhr.finalUrl}, emulatedUserAgent: ${emulatedUserAgent}`);

        result = runnerResult.lhr;
    }
    catch (e) {
        console.log(e);
        result = null;
    } finally {
        await browser.close();
    }
    return { jobID: jobID, result: result };
}