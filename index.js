const { URL } = require(`url`);
const lighthouse = require('lighthouse');
const puppeteer = require(`puppeteer`);
//Overrode config to run ONLY for required audits & categories
const desktopConfig = require('./custom-lr-desktop-config');
const mobileConfig = require('./custom-lr-mobile-config');

exports.lighthouse = async (req, res) => {
    var jobID = req.query.jobID;
    const url = req.query.url;
    const emulatedUserAgent = req.query.emulatedUserAgent;
    if (!jobID) {
        jobID = new Date().getTime();
    }
    console.log(`On demand generate lhr, jobID: ${jobID} url: ${url}, emulatedUserAgent: ${emulatedUserAgent}`);
    const resultJson = await generateLighthouseReport(jobID, url, emulatedUserAgent);
    //TODO: change status code for lh internal errors? and return error message in response?
    res.status(200).send(resultJson);
}

var generateLighthouseReport = async (jobID, url, emulatedUserAgent = 'desktop') => {
    var status = 'error';
    var error = {};
    var lhr = {};
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

        lhr = runnerResult.lhr;
        if (lhr.runtimeError) {
            status = 'error';
            error.code = lhr.runtimeError.code;
            error.message = lhr.runtimeError.message;
            console.log(`runtime error: jobID: ${jobID}, url:${runnerResult.lhr.finalUrl}, error: ${JSON.stringify(error)}`);
        }
        status = 'success';
    }
    catch (e) {
        console.log(e);
        status = 'error';
        if (e.lhrRuntimeError) {
            error.code = e.code;
            error.message = e.friendlyMessage;
        }
    } finally {
        if (browser) {
            await browser.close();
        } else {
            console.log(`failed: to launch browser jobID: ${jobID}, url:${url}, emulatedUserAgent: ${emulatedUserAgent}`);
        }
    }
    if (status == 'error') {
        return { jobID: jobID, status: status, error: error };
    }
    return { jobID: jobID, status: status, audits: lhr.audits, categories: lhr.categories };
}