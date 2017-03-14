import AppClass from 'class/App.class.js'
import NestedUnitImplementation from 'class/NestedUnitImplementation.class.js'
import Condition from 'class/Condition.class.js'
import r from 'rethinkdb'
import getAllConditionTree from 'database/query/getAllConditionTree.query.js'

class ConditionTreeClass extends NestedUnitImplementation {
    
    static ConditionTreeInstanceArray = []

    constructor() {
        super()
    }

    static async initializeAllConditionTree() {
        let allConditionTreeData = await getAllConditionTree(AppClass.context.rethinkdbConnection)
        allConditionTreeData.map((conditionTree) => {
            
        })
    }

    // getConditionTree() {
    //     console.log(getConditionTreeEntrypoint(AppClass.context))
    // }

}

export default ConditionTreeClass
