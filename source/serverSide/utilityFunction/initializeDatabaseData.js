import rethinkDB from 'rethinkdb' 
import { default as Application } from 'appscript'
import {default as getTableDocumentDefault} from "appscript/utilityFunction/database/query/getTableDocument.query.js";
import databaseData from 'databaseDefaultData/databaseData.js'

function initializeDatabaseData() {
    return () => {
        const connection = Application.rethinkdbConnection
        async function createDatabase(databaseName) {
            let databaseExists = await rethinkDB.dbList().contains(databaseName).run(connection);
            if(!databaseExists) {
                let dbCreationResponse = await rethinkDB.dbCreate(databaseName).run(connection)
                if(dbCreationResponse.dbs_created > 0)  console.log(`📢 ${databaseName} database created !`)
            } else {
                console.log(`📢📁 ${databaseName} database already exists !`)            
            }
        }

        async function createTableAndInsertData(databaseName, databaseData) {
            for (let tableData of databaseData) {
                await rethinkDB.db(databaseName).tableCreate(tableData.databaseTableName).run(connection)
                    .then(async tableCreationResponse => {
                        if(tableCreationResponse.tables_created > 0) console.log(`📢 ${tableData.databaseTableName} table created.`)
                        await rethinkDB.db(databaseName).table(tableData.databaseTableName).insert(tableData.data).run(connection)
                            .then(response => {
                                console.log(`📢📥 ${response.inserted} documents inserted to ${tableData.databaseTableName}.`)
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(`📢 ${tableData.databaseTableName} table already exists.`))
            }
        }

        
        createDatabase('webappSetting')
            .then(async () => {
                try {
                    await createTableAndInsertData('webappSetting', databaseData.webappSetting)
                } catch (error) {
                    console.log('webappSetting - cannot create table / insert data for webappSetting')
                    console.log(error)
                    process.exit(1)
                }
            })
            .then(async () => { // initialize template document front end.
                const self = Application
                let getTableDocument = {
                    generate: getTableDocumentDefault,
                    instance: []
                }
                getTableDocument.instance['template_documentFrontend'] = await getTableDocument.generate('template_documentFrontend')
                const documentFrontendData = await getTableDocument.instance['template_documentFrontend'](self.rethinkdbConnection)
                self.frontend = { // Configurations passed to frontend 
                    config: self.config,
                    setting: {
                        location: {
                            routeBasePath: `${self.config.PROTOCOL}${self.config.HOST}`
                        }
                    },
                    route: 'route',
                    document: documentFrontendData,
                }    
            })

        createDatabase('webappContent')
            .then(() => {
                try {
                    createTableAndInsertData('webappContent', databaseData.webappContent)            
                } catch (error) {
                    console.log('webappContent - cannot create table / insert data for webappContent')
                    console.log(error)
                }
            })

        // .do(function(databaseExists) {
        //   return rethinkDB.branch(
        //     databaseExists,
        //     { dbs_created: 0 },
        //     rethinkDB.dbCreate('webapp')
        //   );
        // })
    }
}

export default initializeDatabaseData