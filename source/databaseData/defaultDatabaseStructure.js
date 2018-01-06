// r.db("webapp").table("setting")
r.dbCreate('webapp');
r.db("webapp").tableCreate('setting');
r.db("webapp").table("setting").insert([
  
  // Condition
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
  
  // Template
  {
  	id: 'templateFile',
    template: []
  },
  {
  	id: 'documentFrontend',
    documentFrontend: []
  },
  {
  	id: 'documentBackend',
    documentBackend: []
  },
	{
    id: 'viewImplementation',
    viewImplementation: []
	},
	{
    id: 'viewNestedUnit',
    viewTree: []
  },

  // Other
	{
    id: 'customDatasetSchema',
    customDatasetSchema: []
  },
	{
    id: 'fieldDataType',
    fieldDataType: []
  },

  // Middleware
	{
    id: 'middlewareNestedUnit',
    middlewareNestedUnit: []
  },
	{
    id: 'middlewareImplementation',
    middlewareImplementation: []
  },
	{
    id: 'middlewareFile',
    middlewareFile: []
  },

],
{conflict: "update"}
)
