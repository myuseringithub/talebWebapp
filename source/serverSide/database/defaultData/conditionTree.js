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
            },
            {
                key: '12e03c10-d9fb-4890-a6e9-51052a8c011f',
                treePath: null, // tree child key represent the path
                insertionPointKey: '2299cc1e-238f-4fe5-9069-51351ded59a7'
            }
        ],
    },

    // /api/v1/
    {
        key: '12e03c10-d9fb-4890-a6e9-51052a8c011f',
        label: {
            name: 'api'
        },
        conditionImplementation: '41c1a07a-cfa4-4568-a728-afda3415a47d',
        insertionPoint: [
            {
                key: 'a9e163e4-3389-481e-afa2-d23f6e650c76',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                key: '29f3a820-251c-4b71-99c1-b3e9f7d95002', // TODO: CHANGE NAME TO conditionTreeKey
                treePath: null, // tree child key represent the path
                insertionPointKey: 'a9e163e4-3389-481e-afa2-d23f6e650c76'
            },
        ],
        callback: { // fallback function.
            name: 'file/functionMiddleware/apiBasepath.middleware.js',
            type: 'functionMiddleware'
        },
    },
    {
        key: '29f3a820-251c-4b71-99c1-b3e9f7d95002',
        label: {
            name: '<>/<v1>'
        },
        conditionImplementation: 'b62cb56a-1932-42fd-9829-76d8bda4ff12',
        callback: { // fallback function.
            name: 'file/functionMiddleware/apiV1.middleware.js',
            type: 'functionMiddleware'
        },
        children: [],
        insertionPoint: []
    },


    // /test/subpath, /test/
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
