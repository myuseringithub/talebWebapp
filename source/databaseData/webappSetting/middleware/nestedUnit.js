let data = [

    /**
     * Port: WebappUI
     */
    {
        key: '43d6e114-54b4-47d8-aa68-a2ae97b961d5',
        label: {
            name: 'WebappUI container middleware nested unit.'
        },
        unitKey: '3544ab32-f236-4e66-aacd-6fdf20df069b',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: '0c01c061-92d4-44ad-8cda-098352c107ea', // Common functions
                pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                    order: 1,
                    // placement: {
                    //     type: 'after/before', 
                    //     pathPointer: 'KeyXXXX', 
                    // }
                }
            },
            // {
            //     nestedUnit: '366b44e7-1c26-478c-86b7-70f9504f7586',
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 1,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
            // {
            //     nestedUnit: '7acf5873-630c-41a7-84c4-4b0d52706981',
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 2,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
            // {
            //     nestedUnit: '91140de5-9ab6-43cd-91fd-9eae5843c74c',
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 3,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
        ],
    },
    {
        key: '7acf5873-630c-41a7-84c4-4b0d52706981',
        label: {
            name: 'Google verification'
        },
        unitKey: '3ee0de2a-1e28-436a-bea0-8d5e4637dbe2',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'chronological'
            },
        ],
        children: [
        ],
    },
    {
        key: '91140de5-9ab6-43cd-91fd-9eae5843c74c',
        label: {
            name: 'Static root file'
        },
        unitKey: '20c4b7dd-66de-4b89-9188-f1601f9fc217',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'chronological'
            },
        ],
        children: [
            { // fallback middleware, in case the file was not found.
                nestedUnit: '93afadbe-3b35-42b5-9ce8-1a8d99667e93',
                pathPointerKey: 'xzy5',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                    order: 1,
                    // placement: {
                    //     type: 'after/before', 
                    //     pathPointer: 'KeyXXXX', 
                    // }
                }
            },
        ],
    },
    {
        key: '93afadbe-3b35-42b5-9ce8-1a8d99667e93',
        label: {
            name: 'renderTemplateDocument - homepage'
        },
        unitKey: '122c9a40-5872-4219-ad4e-ad1c237deacd',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'chronological'
            },
        ],
        children: [
        ],
    },

    /**
     * Port: StaticContent
     */
    {
        key: 'fd7848e4-b0e5-44dc-b7de-7fdb3406d504',
        label: {
            name: 'StaticContent container middleware nested unit.'
        },
        unitKey: '3544ab32-f236-4e66-aacd-6fdf20df069b',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: '0c01c061-92d4-44ad-8cda-098352c107ea', // Common functions
                pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                    order: 1,
                    // placement: {
                    //     type: 'after/before', 
                    //     pathPointer: 'KeyXXXX', 
                    // }
                }
            },
            
            // {
            //     nestedUnit: '68fb59e3-af0b-4ea2-800e-7e7e37d7cc31', // JSPM File
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 1,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
            // {
            //     nestedUnit: 'da18242e-792e-4e44-a12b-b280f6331b7c', // Static assets
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 2,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
            // {
            //     nestedUnit: 'a7912856-ad5a-46b0-b980-67fb500af399', // Document element
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 3,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
            // {
            //     nestedUnit: '81cc5f3a-ff61-454f-b6bb-49713c841c29', // Static upload files
            //     pathPointerKey: '9460ba3c-e9f4-415b-b7c3-96eef0c6382e',
            //     insertionPosition: {
            //         insertionPathPointer: null, 
            //         insertionPoint: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
            //         order: 4,
            //         // placement: {
            //         //     type: 'after/before', 
            //         //     pathPointer: 'KeyXXXX', 
            //         // }
            //     }
            // },
        ],
    },



];

export default data