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
    var cordovaActivityPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/org/apache/cordova/CordovaActivity.java');
    var activityData = fs.readFileSync(cordovaActivityPath, 'utf8');
    var statusBarCode = `
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setStatusBarColor(ContextCompat.getColor(activity,R.color.cdv_splashscreen_background));
        super.onCreate(savedInstanceState);`;
    var newCode = activityData.replace(/super.onCreate(savedInstanceState);/g, statusBarCode);
    console.log(newCode.toString());
    fs.writeFileSync(cordovaActivityPath, newCode, 'utf-8');
};
