process.env.SZN_DEBUG = true // show/hide console messages.

import configuration from '../../setup/configuration/configuration.js' 
import { microservice } from 'appscript'
import databaseData from '../databaseData/databaseData.js'

microservice({
    configuration,
    entrypointConditionKey: '78f91938-f9cf-4cbf-9bc8-f97836ff23dd',
    databaseData
})

// _____________________________________________

// TODO: change base url and access-control-allow-origin header according to DEPLOYMENT environment

// TODO: Custom Dataset Schema/structure/blueprint, data document, csustom dataset type, custom fields, custom content type.
// TODO: Condition Tree:
// • Ability to decide insertion position of unit in subtree. e.g. before, after, first, last.
// • Check non immediate children for each insertion point to insert them in their correct destination.
// • Define unique key for each child, to allow insertion into other inserted children. i.e. extending existing trees with other trees and children. 

// TODO: Merge ReusableNestedUnit implementations and organize them according to the requirements like returned value and algorithm executed on the nested tree.