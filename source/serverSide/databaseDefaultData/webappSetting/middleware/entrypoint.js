let tablePrefix = 'middleware_'
let array = [ 
    require('./middlewareFile.js'),
    require('./middlewareImplementation.js'),
    require('./middlewareNestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})

/**
 * {Array of Objects}
 */
export default array