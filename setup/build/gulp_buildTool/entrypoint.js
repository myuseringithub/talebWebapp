const confJson = require('./configuration/configuration.json')
require(`${confJson.appDeploymentLifecyclePath}/babel_javascriptTranspilation/babel_JSCompiler.entrypoint.js`)(__dirname, 'gulpfile.js')