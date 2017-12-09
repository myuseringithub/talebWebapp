let tablePrefix = 'oAuth_'

/**
 * {Array of Objects}
 */
export default [ 
    require('./client.js'),
    require('./token.js'),
    require('./user.js'),
].map(object => {
    object.databaseTableName = tablePrefix.concat(object.databaseTableName)
})