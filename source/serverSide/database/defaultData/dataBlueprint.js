r.db("webapp").table("setting").insert([
  {
  	id: 'dataBlueprint',
    dataBlueprint: {
      template: {
        key: 'String', // key
        filePath: 'String',
        insertionPosition: 'Object'
      },
      view: {
        key: 'String', // key
        template: 'String', // key
        argument: 'Object',
      },
      valueReturningFile: {
        key: 'String', // key
        filePath: 'String',
        type: 'String'
      },
      condition: {
        key: 'String', //key
        valueReturningFile: 'String', //key
        expectedReturn: 'String'
      },
      conditionTree: {
        key: 'String', //key
        insertionPoint: 'Array',
        callback: 'Object',
        children: 'Array'
      },
      viewTree: {
        key: 'String', //key
        insertionPoint: 'Array',
        children: 'Array'
      },
    }
  },
],
{conflict: "update"});
