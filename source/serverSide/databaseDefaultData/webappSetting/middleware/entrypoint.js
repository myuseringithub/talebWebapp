let tablePrefix = 'middleware_'
let array = [ 
    require('./file.js'),
    require('./unit.js'),
    require('./nestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})

/**
 * {Array of Objects}
 */
export default array