import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import serverConfig from 'configuration/serverConfig.js'

export default Object.assign({}, rethinkdbConfig, serverConfig);
