import path from 'path'

const ConfigPath = __dirname,
    appDeploymentLifecyclePath = '/tmp/appDeploymentLifecycle/',
    GulpPath = '/tmp/build/gulp_buildTool/',
    SourceCodePath = '/tmp/source/',
    DestinationPath = '/app/',
    TaskModulePath = path.join(appDeploymentLifecyclePath, 'gulp_buildTool' , 'taskModule/'),
    UtilityModulePath = path.join(appDeploymentLifecyclePath, 'gulp_buildTool', 'utilityModule/'),
    TaskImplementationPath = path.join(GulpPath, 'taskImplementation/')

export default {
    // TODO: create object of constants http://stackoverflow.com/questions/10843572/how-to-create-javascript-constants-as-properties-of-objects-using-const-keyword
    ConfigPath,
    GulpPath,
    SourceCodePath,
    DestinationPath,
    TaskModulePath,
    UtilityModulePath,
    TaskImplementationPath
};