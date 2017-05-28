var data = [];
data.middlewareFile = [
      {
      	key: '1f7531cc-1302-4eab-93f1-d48a1aec07b9',
        label: {
            name: 'useragentDetection'
        },
        filePath: 'appscript/utilityFunction/middleware/useragentDetection.middleware.js',
      },
];
r.db("webapp").table("setting").get("middlewareFile").update({ middlewareFile: data.middlewareFile}, { nonAtomic: true });
