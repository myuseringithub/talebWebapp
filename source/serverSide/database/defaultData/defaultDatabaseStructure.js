// r.db("webapp").table("setting")
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
    id: 'viewImplementation',
    viewImplementation: []
	},
	{
    id: 'viewTree',
    viewTree: []
  },

],
{conflict: "update"}
)
