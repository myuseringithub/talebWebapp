let tablePrefix = 'template_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./documentBackend.js'),
    require('./documentFrontend.js'),
    require('./file.js'),
    require('./unit.js'),
    require('./nestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})
