import path from 'path'

export let 
    rootPath = path.normalize(`${__dirname}/../../clientSide/root`),
    uploadsPath = path.normalize(`${__dirname}/../../clientSide/uploads`)

export default {
    rootPath,
    uploadsPath
}