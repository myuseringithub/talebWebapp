/**
 * Paths to module directories in the Docker container.
 */
const path = require('path')
const confJson = require('../../../setup/configuration.json')

module.exports = {
  appDeploymentLifecyclePath: confJson.appDeploymentLifecyclePath
}
