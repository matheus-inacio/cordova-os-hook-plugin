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

    /* Updates splash statusbar */
    var cordovaActivityPath = path.join(ctx.opts.projectRoot, 'platforms/android/CordovaLib/src/org/apache/cordova/CordovaActivity.java');
    var activityData = fs.readFileSync(cordovaActivityPath, 'utf8');
    var statusBarCode = `
        setContentView(appView.getView());
        try {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            getWindow().setStatusBarColor(android.graphics.Color.parseColor("#FF43598A"));
        } catch (Exception ex) {
          // Ignore  
        };`;
    var newCode = activityData.replaceAll('setContentView(appView.getView());', statusBarCode);
    fs.writeFileSync(cordovaActivityPath, newCode, 'utf-8');
};
