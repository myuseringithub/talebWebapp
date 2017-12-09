let middlewareArray = require('./webappSetting/middleware')
let templateArray = require('./webappSetting/template')
let conditionArray = require('./webappSetting/condition')
let oAuthArray = require('./webappSetting/oAuth')

export default {
    webappSetting: Array.prototype.push.apply(
        middlewareArray, 
        templateArray,
        conditionArray,
        oAuthArray
    ), 
    webappContent: [
        require('./webappContent/university.js'),
        
    ]
}