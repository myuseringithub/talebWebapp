/**
 * Paths to module directories in the Docker container.
 */
const path = require('path')

const dependencyPath = '/project/dependency'
const appDeploymentLifecyclePath = path.join(dependencyPath, 'appDeploymentLifecycle')

 module.exports = {
  appDeploymentLifecyclePath: appDeploymentLifecyclePath
}
