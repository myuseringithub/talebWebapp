var data = [];
data.conditionTree = [
    {
    key: 'default',
    conditionImplementation: 'uuid',
    callback: {
        name: 'middleware/route/route.js',
        type: 'functionMiddleware'
    },
    insertionPoint: [
        {
        key: r.uuid(),
        },
        {
        key: r.uuid(),
        },
    ],
    children: [
        
    ],
    
    },
    {
    key: r.uuid(),
    conditionImplementation: 'uuid',
    callback: {
        name: '',
        type: 'document'
    },
    insertionPoint: [
        {
        key: r.uuid(),
        },
        {
        key: r.uuid(),
        },
    ],
    children: [
        
    ],
    
    },
];

r.db("webapp").table("setting").get("conditionTree").update({ conditionTree: data.conditionTree}, { nonAtomic: true });
