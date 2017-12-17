let data = [
    
    /**
     * Port: WebappUI
     */
    {
        key: 'default',
        label: {
            name: 'GET'
        },
        unitKey: 'c639cd53-c764-4967-b052-1e1652107923',
        callback: { // fallback function.
            name: '518d7b08-f825-486d-be88-1a4df2653022',
            type: 'document'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
            {
                key: '13a170c5-be67-4a60-9630-b9d0750641f4',
                order: 2, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                nestedUnit: 'ff727650-6dfb-48bf-bfc7-be4ad6a6bcdd', // TODO: CHANGE NAME TO conditionTreeKey
                pathPointerKey: 'XYZ2',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '25f4a639-3fcf-4378-9c04-60cf245cd916', // TODO: CHANGE NAME TO conditionTreeKey
                pathPointerKey: 'XYZ1',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: 'ab9c2538-cd9e-40d6-9a93-5296db445035', // TODO: CHANGE NAME TO conditionTreeKey
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '13a170c5-be67-4a60-9630-b9d0750641f4'
                }
            },
        ],
    },
    {
        key: '25f4a639-3fcf-4378-9c04-60cf245cd916',
        label: {
            name: 'URL: /serviceWorker.js'
        },
        unitKey: 'eeace9bc-1ccc-4050-af0b-0aa0f34884e3',
        callback: { // fallback function.
            name: '366b44e7-1c26-478c-86b7-70f9504f7586',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },
    {
        key: 'ff727650-6dfb-48bf-bfc7-be4ad6a6bcdd',
        label: {
            name: 'URL: /google276dc830e9fade0c.html'
        },
        unitKey: '9c6dd381-0f9b-4d6d-9a96-bf9beb3d3108',
        callback: { // fallback function.
            name: '7acf5873-630c-41a7-84c4-4b0d52706981',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },
    {
        key: 'ab9c2538-cd9e-40d6-9a93-5296db445035',
        label: {
            name: 'URL: /<*>'
        },
        unitKey: 'e971b884-1b33-4044-9c93-162ee145b807',
        callback: { // fallback function.
            name: '91140de5-9ab6-43cd-91fd-9eae5843c74c',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },

    /**
     * Port: StaticContent
     */
    {
        key: '78f91938-f9cf-4cbf-9bc8-f97836ff23dd',
        label: {
            name: 'GET'
        },
        unitKey: 'c639cd53-c764-4967-b052-1e1652107923',
        callback: { // fallback function. if doesn't exist will pass to next middleware without callback.
            name: 'XXX',
            type: 'XXX'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
            {
                key: '13a170c5-be67-4a60-9630-b9d0750641f4',
                order: 2, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            /**
             * Port: CDN
             */
            {
                nestedUnit: 'c5a01ebf-8902-437c-a6e1-4a7082f3b28e',
                pathPointerKey: 'XYZ5',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: 'dceb9ff2-1996-47f4-9e14-83111f4501ce',
                pathPointerKey: 'XYZ4',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '182fb317-3361-46dd-9058-5dffd973edb0',
                pathPointerKey: 'XYZ6',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
        ],
    },
    {
        key: 'dceb9ff2-1996-47f4-9e14-83111f4501ce',
        label: {
            name: 'URL: /asset'
        },
        unitKey: 'af30c7db-4d26-4e4c-bab9-a4a5cc666edb',
        callback: { // fallback function.
            name: 'da18242e-792e-4e44-a12b-b280f6331b7c',
            type: 'middlewareNestedUnit'
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
                nestedUnit: 'c8134b3d-752a-476d-b95e-9fd28b1ebb05',
                pathPointerKey: 'XYZ4',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
        ],
    },
    {
        key: 'c8134b3d-752a-476d-b95e-9fd28b1ebb05',
        label: {
            name: 'URL: /asset/javascript/jspm.config.js'
        },
        unitKey: '9c350896-7956-4003-89bb-45a9ae4c67ee',
        callback: { // fallback function.
            name: '68fb59e3-af0b-4ea2-800e-7e7e37d7cc31',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },
    {
        key: 'c5a01ebf-8902-437c-a6e1-4a7082f3b28e',
        label: {
            name: 'URL: /asset:render/webcomponent/document-element/document-element.html'
        },
        unitKey: '4b062262-9ef2-4d15-bc87-7bc6b9fef39b',
        callback: { // fallback function.
            name: 'a7912856-ad5a-46b0-b980-67fb500af399',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },
    {
        key: '182fb317-3361-46dd-9058-5dffd973edb0',
        label: {
            name: 'URL: /upload'
        },
        unitKey: 'd78cbbb1-4e46-4abe-8839-3edf9c25ccd4',
        callback: { // fallback function.
            name: '81cc5f3a-ff61-454f-b6bb-49713c841c29',
            type: 'middlewareNestedUnit'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },


    /**
     * Port: Content API 
     */
    // /api/v1/
    {
        key: '12e03c10-d9fb-4890-a6e9-51052a8c011f',
        label: {
            name: 'api'
        },
        unitKey: '41c1a07a-cfa4-4568-a728-afda3415a47d',
        insertionPoint: [
            {
                key: 'a9e163e4-3389-481e-afa2-d23f6e650c76',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                nestedUnit: '29f3a820-251c-4b71-99c1-b3e9f7d95002', // TODO: CHANGE NAME TO conditionTreeKey
                pathPointerKey: 'XYZ6',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: 'a9e163e4-3389-481e-afa2-d23f6e650c76'
                }
            },
        ],
        callback: { // fallback function.
            name: 'appscript/utilityFunction/middleware/apiBasepath.middleware.js',
            type: 'functionMiddleware'
        },
    },
    {
        key: '29f3a820-251c-4b71-99c1-b3e9f7d95002',
        label: {
            name: '<>/<v1>'
        },
        unitKey: 'b62cb56a-1932-42fd-9829-76d8bda4ff12',
        callback: { // fallback function.
            name: 'appscript/utilityFunction/middleware/apiV1.middleware.js',
            type: 'functionMiddleware'
        },
        children: [],
        insertionPoint: []
    },

    // /**
    //  * Test & Examples
    //  */
    // /test/subpath, /test/
    {
        key: '7c0da598-9bbe-40f8-9d4e-626a88770cbe',
        label: {
            name: 'test'
        },
        unitKey: '1faac46a-c31b-42ab-be83-0ab4d5714a88',
        insertionPoint: [
            {
                key: '1d53f4e7-74f4-41b0-937c-68f976b7d271',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                nestedUnit: '8009c3d2-b7c3-4f68-bb0a-045822647960',
                pathPointerKey: 'XYZ2',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '1d53f4e7-74f4-41b0-937c-68f976b7d271'
                }
            },
            {
                nestedUnit: 'c6cede34-70f0-456e-863b-73f5f3a76a54',
                pathPointerKey: 'XYZ1',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '1d53f4e7-74f4-41b0-937c-68f976b7d271'
                }
            }
        ],
    },
    {
        key: '8009c3d2-b7c3-4f68-bb0a-045822647960',
        label: {
            name: '/<*>/<EMPTY>'
        },
        unitKey: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
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
            name: '/<*>/<subpath>'
        },
        unitKey: 'cb7b1733-12c9-436e-bbef-4e6039eea431',
        callback: { // fallback function.
            name: 'KEY - of /subpath',
            type: 'document'
        },
        children: [],
        insertionPoint: []
    },

    /**
     * Port: OAuth
     */
    {
        key: '0681f25c-4c00-4295-b12a-6ab81a3cb440',
        label: {
            name: 'POST'
        },
        unitKey: '94765b71-4361-412e-80a0-4e5bfe08f2ed',
        callback: { // fallback function.
            name: 'post',
            type: 'consoleLogMessage'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
            {
                key: '13a170c5-be67-4a60-9630-b9d0750641f4',
                order: 2, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
            {
                nestedUnit: '3e458ef2-82ba-4312-a696-ceea6338ae33', 
                pathPointerKey: 'XYZ2',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: 'aa88def0-9d45-4404-a8c9-e438712658ca', 
                pathPointerKey: 'XYZ2',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
        ],
    },
    {
        key: '3e458ef2-82ba-4312-a696-ceea6338ae33',
        label: {
            name: 'URL: /token'
        },
        unitKey: 'd3b015b3-e860-4687-83a0-29d28c5c5fe7',
        callback: { // fallback function.
            name: 'token',
            type: 'portClassMethodMiddleware'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },
    {
        key: 'aa88def0-9d45-4404-a8c9-e438712658ca',
        label: {
            name: 'URL: /authorize'
        },
        unitKey: '7d89c2df-c76f-4ad2-aa2f-d9e58271c7eb',
        callback: { // fallback function.
            name: 'authorize',
            type: 'portClassMethodMiddleware'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'raceFirstPromise'
            },
        ],
        children: [
        ],
    },

];

export default {
    databaseTableName: 'nestedUnit',
    data: data
}