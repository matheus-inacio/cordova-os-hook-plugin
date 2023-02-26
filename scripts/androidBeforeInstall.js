const fs = require('fs');
const path = require('path');
const { events, xmlHelpers } = require('cordova-common');



module.exports = function(ctx) {
    var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    
    try {
      const data = fs.readFileSync(manifestPath, 'utf8');
      console.log(data);
      events.emit('log', data)
    } catch (err) {
      console.error(err);
    }

    var doc = xmlHelpers.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }
    var activityTag = doc.find("application/activity");
    activityTag.attrib["android:theme"] = "@style/AppTheme";
    fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
};
