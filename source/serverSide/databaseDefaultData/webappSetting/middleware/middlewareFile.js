let data = [
  {
    key: '1f7531cc-1302-4eab-93f1-d48a1aec07b9',
    label: {
      name: 'useragentDetection'
    },
    filePath: 'appscript/utilityFunction/middleware/useragentDetection.middleware.js',
  },
  {
    key: '18afb17a-bf49-4bae-a5ba-02a12494d8e2',
    label: {
      name: 'commonFunctionality middlewares'
    },
    filePath: 'appscript/utilityFunction/middleware/serverCommonFunctionality.js',
  },
  {
    key: '45f46e34-0586-4b63-9641-afc034343acb',
    label: {
      name: 'notFound'
    },
    filePath: 'appscript/utilityFunction/middleware/notFound.js',
  },
  {
    key: '81902e75-17a0-41a1-a12d-e5d4446e85d9',
    label: {
      name: 'serveStaticSingleFile.middlewareGenerator.js'
    },
    filePath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFile.middlewareGenerator.js',
  },
  {
    key: 'bb770b52-e40a-46a7-91ca-efd7f355d10f',
    label: {
      name: 'serveStaticDirectory.middlewareGenerator.js'
    },
    filePath: 'appscript/utilityFunction/middleware/staticFile/serveStaticDirectory.middlewareGenerator.js',
  },
  {
    key: 'aad0f39d-ebcc-40ce-a2f5-4ab41a971b46',
    label: {
      name: 'serveStaticSingleFileRenderTemplate.middlewareGenerator.js'
    },
    filePath: 'appscript/utilityFunction/middleware/staticFile/serveStaticSingleFileRenderTemplate.middlewareGenerator.js',
  }
];

module.exports = {
  databaseTableName: 'middleware_middlewareFile',
  data: data
}