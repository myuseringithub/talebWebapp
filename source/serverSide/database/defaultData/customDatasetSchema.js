var data = [];
data.customDatasetSchema = [
    {
        key: 'fed4f371-fcf9-4219-8acd-7e3c19037d9c',
        label: {
            name: 'university',
            description: 'University institutes.'
        },
        blueprint: [
            {
                label: 'name',
                fieldDataTypeKey: 'String'
            },
            {
                label: 'longName',
                fieldDataTypeKey: 'String'
            },
        ]
    }
];

r.db("webapp").table("setting").get("customDatasetSchema").update({ customDatasetSchema: data.customDatasetSchema}, { nonAtomic: true });


// examples: 

let universities = [
    {
        Key:'1',
        name: {
            short: '',
            long: ''
        },
        logo: '',
        gallery: [
            {
                imageTitle: '',
                imageURL: ''
            },
            {
                imageTitle: '',
                imageURL: ''
            },
        ],
    },
    {
        Key:'1',
        name: {
            short: 'Universitatea de Bucharest',
            long: 'USMF'
        },
        logo: 'http://taleb.io/image3',
        gallery: [
            {
                imageTitle: 'Main office building',
                imageURL: 'http://taleb.io/image1'
            },
            {
                imageTitle: 'logo',
                imageURL: 'http://taleb.io/image2'
            },
        ],
    },
    {
        Key:'2',
        name: {
            short: 'Iasi University',
            long: 'USMU'
        },
        logo: 'http://taleb.io/image3',
        gallery: [
            {
                imageTitle: 'Main office building',
                imageURL: 'http://taleb.io/image1'
            },
            {
                imageTitle: 'logo',
                imageURL: 'http://taleb.io/image2'
            },
        ],
    },
]