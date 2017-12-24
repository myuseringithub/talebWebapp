import databaseNestedUnitDataAggregator from 'appscript/utilityFunction/database/databaseNestedUnitDataAggregator.js'
let implementation = 'oAuth'
let dataArray = ['client', 'token', 'user']

/**
 * {Array of Objects}
 */
export default databaseNestedUnitDataAggregator({
    localPath: __dirname,
    implementation,
    dataArray
})