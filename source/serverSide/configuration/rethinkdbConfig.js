import {DEPLOYMENT as development} from 'configuration/serverConfig.js'

let host = 'rethinkdb',
    port = 28015,
    database = 'mobta3athWebapp'

export default {
  development: {
    host,
    port,
    database
  },
  production: {
    host,
    port,
    database
  }
}[development];
