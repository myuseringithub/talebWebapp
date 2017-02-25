import path from 'path'

export let 
    serverBasePath = process.env.NODE_PATH || path.resolve(path.normalize(`${__dirname}/..`)),
    DEPLOYMENT = process.env.DEPLOYMENT || 'development',
    PORT = process.env.PORT || 80,
    SSL = (DEPLOYMENT == 'development') ? true : false

export default { 
  deployment: DEPLOYMENT,
  serverBasePath,
  port: PORT,
  ssl: SSL,
 }

// export default {
//   development: {
//     deployment: DEPLOYMENT,
//     appRootPath: appRootPath,
//     uploadsPath: uploadsPath,
//     port: PORT,
//     ssl: SSL
//   },
//   production: {
//     deployment: DEPLOYMENT,
//     appRootPath: appRootPath,
//     uploadsPath: uploadsPath,
//     port: PORT,
//     ssl: SSL
//   }
// }[DEPLOYMENT];
