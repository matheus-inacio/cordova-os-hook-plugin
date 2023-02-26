module.exports = function(ctx) {
    const fs = require('fs');
    const path = require('path');
    const { xmlHelpers } = require('cordova-common');

    var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/AndroidManifest.xml');
    var doc = xmlHelpers.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }
    var activityTag = doc.find("application/activity");
    activityTag.attrib["android:theme"] = "@style/AppTheme";
    fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
};
