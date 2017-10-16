const moduleSystem = require('module')
const path = require('path')

const appRootPath = path.normalize(__dirname)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

if(process.env.DEPLOYMENT == 'production') {
    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.

    // Allow unreleased nodejs features
} else { // DEPLOYMENT == development
// Transpile js scripts on runtime using Babel.
    // global.SZN = {}
    // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.
    const confJson = require('./configuration/configuration.export.js')
    const babelJSCompilerPath = path.normalize(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js/entrypoint.js`)
    const babelJSCompiler = require(babelJSCompilerPath)
    babelJSCompiler({
        babelConfigurationFile: 'es2015.BabelConfig.js'
    })
}

require('./app.js')

