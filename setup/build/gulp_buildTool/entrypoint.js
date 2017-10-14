const path = require('path')
const confJson = require('./configuration/configuration.json')
const moduleSystem = require('module')

// add node_modules directories
const nodeModuleFolderPath = __dirname + "/node_modules" 
process.env.NODE_PATH = nodeModuleFolderPath
moduleSystem.Module._initPaths()

// Run babel runtime compiler
const babelJSCompilerPath = path.normalize(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation.js/entrypoint.js`)
const babelJSCompiler = require(babelJSCompilerPath)
babelJSCompiler({
    appRootPath: __dirname, 
    babelConfigurationFile: 'es2015.BabelConfig.js'
})

// run app code
require('./gulpfile.js')