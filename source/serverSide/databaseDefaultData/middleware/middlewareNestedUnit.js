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
                executionType: 'chronological'
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
];

r.db("webapp").table("setting").get("middlewareNestedUnit").update({ middlewareNestedUnit: data.middlewareNestedUnit}, { nonAtomic: true });
