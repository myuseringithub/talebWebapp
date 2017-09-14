let data = [
    {
        key: 'e28c566e-e456-44a9-a85f-28a3bb225e97',
        label: {
            name: 'Empty middleware for creating chains'
        },
        executionType: 'regularFunction',
        middlewareFile: '350d2024-49ad-4c6a-afa1-f348b212170f',
    },
    {
        key: '3544ab32-f236-4e66-aacd-6fdf20df069b',
        label: {
            name: 'useragentDetection'
        },
        executionType: 'middleware',
        middlewareFile: '1f7531cc-1302-4eab-93f1-d48a1aec07b9',
    },
    {
        key: '73873bfd-a667-4de3-900c-c06320e8dc67',
        label: {
            name: 'commonFunctionality middlewares'
        },
        executionType: 'regularFunction',
        middlewareFile: '18afb17a-bf49-4bae-a5ba-02a12494d8e2',
    },
    {
        key: '5e93b08c-557a-4d67-adc7-a06447f4ebad',
        label: {
            name: 'notFound'
        },
        executionType: 'regularFunction',
        middlewareFile: '45f46e34-0586-4b63-9641-afc034343acb',
    },
    {
        key: '7a33a77a-4679-41e0-984a-8be96e56526d',
        label: {
            name: 'Service worker file'
        },
        arguments: {
            filePath: `/asset/javascript/serviceWorker/serviceWorker.js`,
            urlPath: '/serviceWorker.js', // determines the scope of the service worker.
            options: {
                gzip: true,
            },
        },
        executionType: 'regularFunction',
        middlewareFile: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    },
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
        middlewareFile: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    },
    {
        key: '20c4b7dd-66de-4b89-9188-f1601f9fc217',
        label: {
            name: 'Static root files'
        },
        arguments: {
            directoryPath: `/template/`,
            urlPath: '/',
            options: {
                gzip: true,
                // index: 'entrypoint.html'
            }
        },
        executionType: 'regularFunction',
        middlewareFile: 'bb770b52-e40a-46a7-91ca-efd7f355d10f',
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
        middlewareFile: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    },
    {
        key: 'c2539d29-d217-41c9-a984-a17d741946c5',
        label: {
            name: 'static assets'
        },
        arguments: {
            directoryPath: `/asset/`,
            urlPath: '/asset',
            options: { gzip: true },
        },
        executionType: 'regularFunction',
        middlewareFile: 'bb770b52-e40a-46a7-91ca-efd7f355d10f',
    },
    { // [NOT EXACTLY] Overrides that of the above general rule for asset folder subfiles.
        key: '07e1ba94-0808-4dc1-b832-f7a54b377692',
        label: {
            name: 'document-element.html static file with URL: asset:render'
        },
        arguments: {
            filePath: `/asset/webcomponent/document-element/document-element.html`,
            options: { gzip: true },
        },
        executionType: 'regularFunction',
        middlewareFile: 'aad0f39d-ebcc-40ce-a2f5-4ab41a971b46',
    },
    {
        key: '2f862d7f-0ae9-4dd0-aae8-4796bbe0581f',
        label: {
            name: 'static uploaded files'
        },
        arguments: {
            directoryPath: `/upload/`,
            urlPath: '/upload',
            options: { gzip: true },
        },
        executionType: 'regularFunction',
        middlewareFile: 'bb770b52-e40a-46a7-91ca-efd7f355d10f',
    },

        /**
         * 
         */
    {
        key: '122c9a40-5872-4219-ad4e-ad1c237deacd',
        label: {
            name: 'RenderTemplateDocument: Main page.'
        },
        arguments: {
            documentKey: '518d7b08-f825-486d-be88-1a4df2653022'
        },
        executionType: 'regularFunction',
        middlewareFile: '20f0e914-e22b-4a07-83d0-1ff2c1d51902',
    },

];

module.exports = {
    databaseTableName: 'middleware_middlewareImplementation',
    data: data
}