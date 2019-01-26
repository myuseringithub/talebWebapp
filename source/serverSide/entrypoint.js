const moduleSystem = require('module')
const path = require('path')
const configuration = require('../../setup/configuration/configuration.js')

const appRootPath = path.normalize(__dirname)
// add root path (app base path) to the resolved module paths.
// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
// '${appRootPath}' allows for folders/modules inside the main folder to be called with out using relative paths.
// '${appRootPath}/node_modules' allows for modules from upper herarchies to call modules from sibling folders. e.g. source/x calls source/y/node_modules/module
process.env.NODE_PATH = `${process.env.NODE_PATH || ''}:${appRootPath}:${appRootPath}/node_modules`.replace(/(^\:+)/, '')
console.log(`• Node additional module resolution paths: ${process.env.NODE_PATH}`)
moduleSystem._initPaths()

switch (process.env.DEPLOYMENT) {
    case 'production':
    break;
    case 'development':
    default:
        // Transpile js scripts on runtime using Babel.
        // global.SZN = {}
        // global.SZN.APP = require('appscript/configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.
        const babelJSCompilerPath = path.normalize(`${configuration.deploymentScriptPath}/babel_javascriptTranspilation.js/entrypoint.js`)
        const babelJSCompiler = require(babelJSCompilerPath)
        babelJSCompiler({
            babelConfigurationFile: 'es2015.BabelConfig.js'
        })
    break;
}

require('./app.js')

