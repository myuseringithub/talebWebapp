let tablePrefix = 'middleware_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./middlewareFile.js'),
    require('./middlewareImplementation.js'),
    require('./middlewareNestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
})