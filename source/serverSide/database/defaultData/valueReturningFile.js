var data = [];
data.valueReturningFile = [
      {
      	key: '301ff7c3-e0f7-45be-9ac3-8ce2c88416fe',
        filePath: 'file/function/getMethod.js',
      },
      {
      	key: 'c1f63d39-7dc1-4c02-b006-ae7b99d10a98',
        filePath: 'file/function/getUrlPathAsArray.js',
      },
      {
      	key: '956a0f0f-437a-4cdf-9bcd-f205fc8336f9',
        filePath: 'file/function/getUrlPathLevel1.js',
      },
      {
      	key: 'd3b24455-3c21-4b5d-80b6-55bd9cdb98e2',
        filePath: 'file/function/getUrlPathLevel2.js',
      },
      {
      	key: '8cba92fa-14bf-4e58-b875-c3ee3b1f39a8',
        filePath: 'file/function/getUrlPathLevel3.js',
      },
];
r.db("webapp").table("setting").get("valueReturningFile").update({ valueReturningFile: data.valueReturningFile}, { nonAtomic: true });
