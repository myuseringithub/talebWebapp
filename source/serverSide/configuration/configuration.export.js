import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import serverConfig from 'configuration/serverConfig.js'
import clientConfig from 'configuration/clientConfig.js'

export default Object.assign({}, rethinkdbConfig, serverConfig, clientConfig);
