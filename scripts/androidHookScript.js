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
    fs.writeFileSync(icSplashPath, result, 'utf-8');
};
