// .babelrc doesn't have a way to specify path. 

// Define server base path. Hackish way to make sure the path is always consistent. Base path in Nodejs is where the closest parent node_modules is located to the initiated js script.
let path = require('path')
process.env.NODE_PATH = path.normalize(`${__dirname}/`)
require('module').Module._initPaths()

// Allow unreleased nodejs features
require("babel-register")
require('gulpfile.js')
