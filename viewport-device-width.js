const { Audit } = require("lighthouse");
const ComputedViewportMeta = require('lighthouse/lighthouse-core/computed/viewport-meta');

class ViewportDeviceWidth extends Audit {
    static get meta() {
        return {
            id: "viewport-device-width",
            title: "Has viewport content is set to width=device-width",
            failureTitle: "Does not have required meta viewport content width set to device-width",
            description: "The page defines a fixed-width viewport property, which means that it can't adjust for different screen sizes. To fix this error, adopt a responsive design for your site’s pages, and set the viewport to match the device’s width and scale accordingly.",
            requiredArtifacts: ["MetaElements"],
        };
    }

    static async audit(artifacts) {
        const viewportMetaList = artifacts.MetaElements.filter(
            meta => meta.name === "viewport" && meta.content && meta.content.includes('width=device-width')
        );
        if (viewportMetaList.length == 0) {
            return {
                score: 0,
                explanation: `No tag <meta name="viewport" content="width=device-width"> found`,
            };
        }

        return {
            score: 1
        };
    }
}

module.exports = ViewportDeviceWidth;