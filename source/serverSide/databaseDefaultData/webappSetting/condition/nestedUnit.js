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





];

export default data