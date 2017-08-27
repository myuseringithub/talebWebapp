module.exports = {
    webappSetting: [
        require('./webappSetting/template/documentBackend.js'),
        require('./webappSetting/template/documentFrontend.js'),
        require('./webappSetting/template/templateFile.js'),
        require('./webappSetting/template/viewImplementation.js'),
        require('./webappSetting/template/viewNestedUnit.js'),

        require('./webappSetting/middleware/middlewareFile.js'),
        require('./webappSetting/middleware/middlewareImplementation.js'),
        require('./webappSetting/middleware/middlewareNestedUnit.js'),

        require('./webappSetting/condition/conditionTree.js'),
        require('./webappSetting/condition/conditionImplementation.js'),
        require('./webappSetting/condition/valueReturningFile.js')
    ], 
    webappContent: [
        require('./webappContent/university.js'),
        
    ]
}