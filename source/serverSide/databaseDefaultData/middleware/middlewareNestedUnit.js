var data = [];
data.middlewareNestedUnit = [
    {
        key: '0adb621b-ae9d-4d4c-9166-16aefbfe0e21',
        label: {
            name: 'useragentDetection'
        },
        middlewareImplementation: '3544ab32-f236-4e66-aacd-6fdf20df069b',
        insertionPoint: [
            {
                key: 'de45db35-5e0d-49b1-82bc-659fc787b0c1',
                order: 1,
                executionType: 'middlewareArray'
            },
        ],
        children: [
            // {
            //     key: '7c0da598-9bbe-40f8-9d4e-626a88770cbe',
            //     treePath: null, // tree child key represent the path
            //     insertionPointKey: '2299cc1e-238f-4fe5-9069-51351ded59a7'
            // },
        ],
    },
    {
        key: 'cb20db07-4c5a-4c36-ae86-4f945d9fccb3',
        label: {
            name: 'commonFunctionality middlewares'
        },
        middlewareImplementation: '73873bfd-a667-4de3-900c-c06320e8dc67',
        insertionPoint: [],
        children: [],
    },
    {
        key: '1b18ecb2-b281-4cb6-a3fa-6d3bdf9c583d',
        label: {
            name: 'notFound'
        },
        middlewareImplementation: '5e93b08c-557a-4d67-adc7-a06447f4ebad',
        insertionPoint: [],
        children: [],
    },
    {
        key: '27af18c4-d2b1-4420-951c-bb3933184f6d',
        label: {
            name: 'Service worker file'
        },
        middlewareImplementation: '7a33a77a-4679-41e0-984a-8be96e56526d',
        insertionPoint: [],
        children: [],
    },
    {
        key: 'cfa43f4b-f351-46e1-92e4-40636f279eb9',
        label: {
            name: 'Google verification'
        },
        middlewareImplementation: '3ee0de2a-1e28-436a-bea0-8d5e4637dbe2',
        insertionPoint: [],
        children: [],
    },
    {
        key: '7d0e5a56-f5a0-4d5b-b329-bbf1cccd4552',
        label: {
            name: 'Static root files'
        },
        middlewareImplementation: '20c4b7dd-66de-4b89-9188-f1601f9fc217',
        insertionPoint: [],
        children: [],
    }
];

r.db("webapp").table("setting").get("middlewareNestedUnit").update({ middlewareNestedUnit: data.middlewareNestedUnit}, { nonAtomic: true });
