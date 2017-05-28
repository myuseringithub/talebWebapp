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
];

r.db("webapp").table("setting").get("middlewareImplementation").update({ middlewareImplementation: data.middlewareImplementation}, { nonAtomic: true, returnChanges: 'always' });
