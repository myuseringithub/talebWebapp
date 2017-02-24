import rethinkdbConfig from 'configuration/rethinkdbConfig.js'
import r from 'rethinkdb'

export function handleConnection() {
    return async (context, next) => {
        await r // Create connection
            .connect({
                host: rethinkdbConfig.host, 
                port: rethinkdbConfig.port, 
                db: rethinkdbConfig.database 
            })
            .then(async (conn) => {
                context.SZN.rethinkdbConn = conn
                console.log('SZN - Rethinkdb database - opened connection')
            })
            .catch((error) => {
                throw(error)
            })
        await next() // Execute database-dependent middleware
        context.SZN.rethinkdbConn.close().then(() => { // Close connection
            console.log('SZN - Rethinkdb database - connection closed')
        })
    }
}
