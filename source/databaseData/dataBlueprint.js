r.db("webapp").table("setting").insert([
  {
  	id: 'dataBlueprint',
    dataBlueprint: {
      template: {
        key: 'XXXXX', // key
        filePath: 'String',
        insertionPosition: 'Object'
      },
      view: {
        key: 'XXXXX', // key
        template: 'String', // key
        argument: 'Object',
      },
      valueReturningFile: {
        key: 'XXXXX', // key
        filePath: 'String',
        type: 'String'
      },
      condition: {
        key: 'XXXXX', //key
        valueReturningFile: 'String', //key
        expectedReturn: 'String'
      },
      conditionTree: {
        key: 'XXXXX', //key
        insertionPoint: 'Array',
        callback: 'Object',
        children: 'Array'
      },
      viewTree: {
        key: 'XXXXX', //key
        insertionPoint: 'Array',
        children: 'Array'
      },
      customDatasetSchema: {
        key: 'XXXXX',
        name: 'String',
        blueprint: 'Array'
      }
    }
  },
],
{conflict: "update"});
