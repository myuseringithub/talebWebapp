// This file would be required in Redbird reverseProxy. 
// USAGE: 

module.exports = function reverseProxy(proxy) {

    let email = process.env.EMAIL
    let domain = 'taleb.io'
    let containerGroupName = 'talebwebapp'

    proxy.register(
        domain, 
        `http://${containerGroupName}_nodejs:80`, {
        ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        `api.` + domain, 
        `http://${containerGroupName}_nodejs:8082`, 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        `cdn.` + domain, 
        `http://${containerGroupName}_nodejs:8081`, 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    proxy.register(
        `oauth.` + domain, 
        `http://${containerGroupName}_nodejs:8088`, 
        {
            ssl: {
                letsencrypt: {
                    email: email, // Domain owner/admin email
                    production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
                }
            }
        }
    );
    
    proxy.register(
        `rethinkdb.` + domain, 
        `http://${containerGroupName}_rethinkdb:8080`
    );

}
