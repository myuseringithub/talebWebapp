const moduleSystem = require('module')

if(process.env.DEPLOYMENT == 'production') {
    // Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
    process.env.NODE_PATH = __dirname + 'node_modules';
    moduleSystem.Module._initPaths();

    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.

    // Allow unreleased nodejs features
} else { // DEPLOYMENT == development
// Transpile js scripts on runtime using Babel.
    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.
    const confJson = require('./configuration/configuration.export.js')
    const babelJSCompiler = require(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation/entrypoint.js`)
    babelJSCompiler({
        appRootPath: __dirname, 
        babelConfigurationFile: 'es2015.BabelConfig.js'
    })
}

require('app.js')

