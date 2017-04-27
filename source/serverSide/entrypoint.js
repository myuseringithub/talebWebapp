if(process.env.DEPLOYMENT == 'production') {
    // Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
    process.env.NODE_PATH = __dirname;
    require('module').Module._initPaths();

    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.

    // Allow unreleased nodejs features
    require('app.js')
} else { // DEPLOYMENT == development
    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.
    const confJson = require('appscript/configuration/configuration.json')
    require(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation/babel_JSCompiler.entrypoint.js`)(__dirname, 'app.js', 'appscriptBabelConfig.js')
}


