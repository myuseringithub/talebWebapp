var data = [];
data.documentBackend = [
    {
        key: '518d7b08-f825-486d-be88-1a4df2653022',
        label: {
            name: 'entrypoint'
        },
        viewNestedUnit: '0d65c113-acce-4f01-8eea-ab6cb7152405'
    },
    
];
r.db("webapp").table("setting").get("documentBackend").update({ documentBackend: data.documentBackend}, { nonAtomic: true });