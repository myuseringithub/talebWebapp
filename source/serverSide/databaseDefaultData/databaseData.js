let middlewareArray = require('./webappSetting/middleware')
let templateArray = require('./webappSetting/template')
let conditionArray = require('./webappSetting/condition')
let oAuthArray = require('./webappSetting/oAuth')

let webappSetting = [].concat.apply([], [
    middlewareArray, 
    templateArray,
    conditionArray,
    oAuthArray
])

export default {
    webappSetting, 
    webappContent: [
        require('./webappContent/university.js'),
        
    ]
}