let tablePrefix = 'template_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./documentBackend.js'),
    require('./documentFrontend.js'),
    require('./templateFile.js'),
    require('./viewImplementation.js'),
    require('./viewNestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})
