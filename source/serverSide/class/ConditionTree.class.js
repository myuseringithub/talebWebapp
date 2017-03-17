import AppClass from 'class/App.class.js'
import NestedUnitImplementation from 'class/NestedUnitImplementation.class.js'
import Condition from 'class/Condition.class.js'
import r from 'rethinkdb'
import getAllConditionTree from 'database/query/getAllConditionTree.query.js'
import getConditionTree from 'database/query/getConditionTree.query.js'

const self = class ConditionTree extends NestedUnitImplementation {
    
    static instance = [] // conditionTreeKey -> { Json data, properties } 

    constructor(conditionTreeKey) {
        super(true)
        self.instance[conditionTreeKey] = this;
    }

    static async initializeConditionTree(connection, conditionTreeKey) { // Entrypoint Instance
        // [1] Instance.
        await self.createInstance(connection, conditionTreeKey, getConditionTree)
        // [2] Check condition.
        await self.extendedSubclass.static['Condition'].checkCondition(connection, self.instance[conditionTreeKey].conditionImplementation)

        // let allConditionTreeData = await getAllConditionTree(connection)
        // allConditionTreeData.map((conditionTree) => {
            
        // })
    }
    
}

export default self
