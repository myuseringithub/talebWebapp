import databaseNestedUnitDataAggregator from 'appscript/utilityFunction/database/databaseNestedUnitDataAggregator.js'
let implementation = 'template'
let dataArray = ['documentBackend', 'documentFrontend', 'file', 'unit', 'nestedUnit']

/**
 * {Array of Objects}
 */
export default databaseNestedUnitDataAggregator({
    localPath: __dirname,
    implementation,
    dataArray
})
