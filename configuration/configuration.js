const projectPath = "/project",
      appDeploymentLifecyclePath = `${projectPath}/application/dependency/appDeploymentLifecycle`

module.exports = {
    projectPath, 
    appDeploymentLifecyclePath,
    databaseVersion: 1,
    GulpPath: `${projectPath}/application/setup/build`, // TODO: is it actually needed. remove if possible.
    SourceCodePath: `${projectPath}/application/source`,
    DestinationPath: `${projectPath}/application/distribution`,
    dockerImageName: 'taleb-webapp',
    entrypoint: {
        build: {
            file: `${appDeploymentLifecyclePath}/entrypoint/build/build.js`,
            argument: {}
        },
        run: {
            file: `${appDeploymentLifecyclePath}/entrypoint/run/run.js`,
        },
        test: {
            file: `${appDeploymentLifecyclePath}/entrypoint/test/test.js`,
        },
    }
}