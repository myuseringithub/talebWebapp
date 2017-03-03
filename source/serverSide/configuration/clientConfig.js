import path from 'path'

export let 
    rootPath = path.normalize(`${__dirname}/../../clientSide/root`),
    uploadPath = path.normalize(`${__dirname}/../../clientSide/upload`),
    assetPath = path.normalize(`${__dirname}/../../clientSide/asset`)

export default {
    assetPath,
    rootPath,
    uploadPath
}