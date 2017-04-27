var data = [];
data.conditionImplementation = [
    {
        key: 'c639cd53-c764-4967-b052-1e1652107923',
        label: {
            name: 'Method = GET'
        },
        expectedReturn: 'GET',
        valueReturningFileKey: '301ff7c3-e0f7-45be-9ac3-8ce2c88416fe',
    },
    {
        key: '1faac46a-c31b-42ab-be83-0ab4d5714a88',
        label: {
            name: '/<test>/'
        },
        expectedReturn: 'test',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
        label: {
            name: '<>/<null>'
        },
        expectedReturn: false,
        valueReturningFileKey: 'd3b24455-3c21-4b5d-80b6-55bd9cdb98e2',
    },
    {
        key: 'cb7b1733-12c9-436e-bbef-4e6039eea431',
        label: {
            name: '<>/<subpath>'
        },
        expectedReturn: 'subpath',
        valueReturningFileKey: 'd3b24455-3c21-4b5d-80b6-55bd9cdb98e2',
    },

    // /api/v1/
    {
        key: '41c1a07a-cfa4-4568-a728-afda3415a47d',
        label: {
            name: '/<api>/'
        },
        expectedReturn: 'api',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: 'b62cb56a-1932-42fd-9829-76d8bda4ff12',
        label: {
            name: '<>/<v1>'
        },
        expectedReturn: 'v1',
        valueReturningFileKey: 'd3b24455-3c21-4b5d-80b6-55bd9cdb98e2',
    },
];

r.db("webapp").table("setting").get("conditionImplementation").update({ conditionImplementation: data.conditionImplementation}, { nonAtomic: true, returnChanges: 'always' });
