// TODO: add ability for recursive types. Datatype of other Datatypes. & Allow nested tree structures in fields.  Repeater
var data = [];
data.fieldDataType = [
    {
        key: 'c8e940ed-e903-4c90-825a-77bd255d3a0d',
        label: {
            name: 'String',
            description: 'Accepts any pure string.'
        },
        webcomponent: 'component',
        validationFunction: 'function',
        
    },
];

r.db("webapp").table("setting").get("fieldDataType").update({ fieldDataType: data.fieldDataType}, { nonAtomic: true });
