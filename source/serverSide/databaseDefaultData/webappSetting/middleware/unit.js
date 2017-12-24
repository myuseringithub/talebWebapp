let data = [
    {
        key: '3ee0de2a-1e28-436a-bea0-8d5e4637dbe2',
        label: {
            name: 'Google verification'
        },
        arguments: {
            filePath: `/template/root/google276dc830e9fade0c.html`,
            urlPath: '/google276dc830e9fade0c.html', // determines the scope of the service worker.
            options: {
                gzip: true,
            }
        },
        executionType: 'regularFunction',
        fileKey: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    },
    {
        key: 'fe175a7c-45ab-4d7a-9fba-57245eee0527',
        label: {
            name: 'jspm.config.js static file'
        },
        arguments: {
            filePath: `/jspm_packageManager/jspm.config.js`,
            urlPath: '/asset/javascript/jspm.config.js',
            options: { gzip: true },
        },
        executionType: 'regularFunction',
        fileKey: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    },
    {
        key: '122c9a40-5872-4219-ad4e-ad1c237deacd',
        label: {
            name: 'RenderTemplateDocument: Main page.'
        },
        arguments: {
            documentKey: '518d7b08-f825-486d-be88-1a4df2653022'
        },
        executionType: 'regularFunction',
        fileKey: '20f0e914-e22b-4a07-83d0-1ff2c1d51902',
    },

];

export default data