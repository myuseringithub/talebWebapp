let data = [
    /**
     * General conditions
     */
    {
        key: 'c639cd53-c764-4967-b052-1e1652107923',
        label: {
            name: 'Method = GET'
        },
        expectedReturn: 'GET',
        valueReturningFileKey: '301ff7c3-e0f7-45be-9ac3-8ce2c88416fe',
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
        key: 'e971b884-1b33-4044-9c93-162ee145b807',
        label: {
            name: 'If exists URL level 1'
        },
        expectedReturn: true,
        valueReturningFileKey: 'a701d0ee-a934-4f2c-b625-6ae97514be15',
    },

    /**
     * Port: WebappUI
     */
    {
        key: 'eeace9bc-1ccc-4050-af0b-0aa0f34884e3',
        label: {
            name: 'URL: /serviceWorker.js'
        },
        expectedReturn: 'serviceWorker.js',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: '9c6dd381-0f9b-4d6d-9a96-bf9beb3d3108',
        label: {
            name: 'URL: /google276dc830e9fade0c.html'
        },
        expectedReturn: 'google276dc830e9fade0c.html',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: 'af30c7db-4d26-4e4c-bab9-a4a5cc666edb',
        label: {
            name: 'URL: /asset/'
        },
        expectedReturn: 'asset',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },

    /**
     * Port: StaticContent
     */
    {
        key: '9c350896-7956-4003-89bb-45a9ae4c67ee',
        label: {
            name: 'URL: /asset/javascript/jspm.config.js'
        },
        expectedReturn: 'asset/javascript/jspm.config.js',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: '4b062262-9ef2-4d15-bc87-7bc6b9fef39b',
        label: {
            name: 'URL: /asset:render/'
        },
        expectedReturn: 'asset:render',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: 'd78cbbb1-4e46-4abe-8839-3edf9c25ccd4',
        label: {
            name: 'URL: /upload'
        },
        expectedReturn: 'upload',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },


    /**
     * Content API: /api/v1/
     */
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


    /**
     * General conditions
     */
    {
        key: '94765b71-4361-412e-80a0-4e5bfe08f2ed',
        label: {
            name: 'Method = POST'
        },
        expectedReturn: 'POST',
        valueReturningFileKey: '301ff7c3-e0f7-45be-9ac3-8ce2c88416fe',
    },
    {
        key: 'd3b015b3-e860-4687-83a0-29d28c5c5fe7',
        label: {
            name: 'URL: /token/'
        },
        expectedReturn: 'token',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },
    {
        key: '7d89c2df-c76f-4ad2-aa2f-d9e58271c7eb',
        label: {
            name: 'URL: /authorize/'
        },
        expectedReturn: 'authorize',
        valueReturningFileKey: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
    },

];

export default {
    databaseTableName: 'conditionImplementation',
    data: data
}