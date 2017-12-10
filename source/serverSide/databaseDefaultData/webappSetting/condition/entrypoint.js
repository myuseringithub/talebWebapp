let tablePrefix = 'condition_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./valueReturningFile.js'),
    require('./conditionImplementation.js'),
    require('./conditionTree.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
    return object
})