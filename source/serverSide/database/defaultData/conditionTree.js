var data = [];
data.conditionTree = [
    {
        key: 'default',
        label: {
            name: 'GET'
        },
        conditionImplementation: 'c639cd53-c764-4967-b052-1e1652107923',
        callback: { // fallback function.
            name: 'middleware/route/route.js',
            type: 'functionMiddleware'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                key: '7c0da598-9bbe-40f8-9d4e-626a88770cbe',
                treePath: null, // tree child key represent the path
                insertionPointKey: '2299cc1e-238f-4fe5-9069-51351ded59a7'
            }
        ],
    },

    {
        key: '7c0da598-9bbe-40f8-9d4e-626a88770cbe',
        label: {
            name: 'test'
        },
        conditionImplementation: '1faac46a-c31b-42ab-be83-0ab4d5714a88',
        insertionPoint: [
            {
                key: '1d53f4e7-74f4-41b0-937c-68f976b7d271',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                key: '8009c3d2-b7c3-4f68-bb0a-045822647960',
                treePath: null, // tree child key represent the path
                insertionPointKey: '1d53f4e7-74f4-41b0-937c-68f976b7d271'
            },
            {
                key: 'c6cede34-70f0-456e-863b-73f5f3a76a54',
                treePath: null, // tree child key represent the path
                insertionPointKey: '1d53f4e7-74f4-41b0-937c-68f976b7d271'
            }
        ],
    },


    {
        key: '8009c3d2-b7c3-4f68-bb0a-045822647960',
        label: {
            name: '<>/<false>'
        },
        conditionImplementation: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
        callback: { // fallback function.
            name: 'KEY - of /',
            type: 'document'
        },
        children: [],
        insertionPoint: []
    },


    {
        key: 'c6cede34-70f0-456e-863b-73f5f3a76a54',
        label: {
            name: '<>/<subpath>'
        },
        conditionImplementation: 'cb7b1733-12c9-436e-bbef-4e6039eea431',
        callback: { // fallback function.
            name: 'KEY - of /subpath',
            type: 'document'
        },
        children: [],
        insertionPoint: []
    },
];

r.db("webapp").table("setting").get("conditionTree").update({ conditionTree: data.conditionTree}, { nonAtomic: true });
