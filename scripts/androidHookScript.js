const fs = require('fs');
const path = require('path');
const { xmlHelpers } = require('cordova-common');

module.exports = function(ctx) {
    /* Removes default cordova icon */
    var icSplashPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/res/drawable/ic_cdv_splashscreen.xml');
    fs.unlinkSync(icSplashPath);
    
    /* Updates splash icon */
    var icSplashPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/res/values/themes.xml');
    var data = fs.readFileSync(icSplashPath, 'utf8');
    var result = data.replace(/ic_cdv_splashscreen/g, 'splash_inset');
    console.log(data.toString());
    fs.writeFileSync(icSplashPath, result, 'utf-8');

    return;
    
    /* Updates the theme in the android manifest */
    var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var doc = xmlHelpers.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }
    var activityTag = doc.find("application/activity");
    activityTag.attrib["android:theme"] = "@style/AppTheme";
    fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
};
