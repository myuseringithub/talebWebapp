import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import serverConfig from 'configuration/serverConfig.js'
import appConfig from 'configuration/appConfig.js'

export default Object.assign({}, rethinkdbConfig, serverConfig, appConfig);
