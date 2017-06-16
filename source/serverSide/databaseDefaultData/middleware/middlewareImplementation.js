var data = [];
data.middlewareImplementation = [
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
        middlewareFile: '53cc8bc5-b1e4-4dc8-a4d6-6ebe1f4c8a54',
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
];

r.db("webapp").table("setting").get("middlewareImplementation").update({ middlewareImplementation: data.middlewareImplementation}, { nonAtomic: true, returnChanges: 'always' });
