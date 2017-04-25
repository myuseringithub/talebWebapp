// global.SZN = {}
// global.SZN.APP = require('configuration/configuration.export.js') // Load configuration settings. NOTE: babel doesn't order import correctly when compiling, therefore global.SZN is required in this file not in app.js.

const confJson = require('./configuration/configuration.json')
const babelConfig = {
  "presets": ["es2015", "stage-0"],
  "plugins": [
    "transform-runtime", 
    "add-module-exports",
    ["transform-class-properties", { "spec": false }]
  ],
  ignore: /node_modules\/(?!appscript)/ // ignore everythng in node_modules except internal modules.
}
require(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation/babel_JSCompiler.entrypoint.js`)(__dirname, 'app.js', babelConfig)