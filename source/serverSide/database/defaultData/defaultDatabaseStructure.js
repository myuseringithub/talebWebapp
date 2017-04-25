// r.db("webapp").table("setting")
r.dbCreate('webapp');
r.db("webapp").tableCreate('setting');
r.db("webapp").table("setting").insert([
	{
    id: 'valueReturningFile',
    valueReturningFile: []
	},
	{
    id: 'conditionTree',
    conditionTree: []
  },
	{
    id: 'conditionImplementation',
    conditionImplementation: []
	},
  {
  	id: 'template',
    template: []
  },
  {
  	id: 'document',
    document: []
  },
	{
    id: 'viewImplementation',
    viewImplementation: []
	},
	{
    id: 'viewTree',
    viewTree: []
  },
	{
    id: 'customDatasetSchema',
    customDatasetSchema: []
  },
	{
    id: 'fieldDataType',
    fieldDataType: []
  },

],
{conflict: "update"}
)
