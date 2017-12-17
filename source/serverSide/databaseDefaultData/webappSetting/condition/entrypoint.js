let tablePrefix = 'condition_'

/**
 * {Array of Objects}
 */
export default [
    require('./file.js'),
    require('./unit.js'),
    require('./nestedUnit.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})