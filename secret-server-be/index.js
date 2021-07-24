const startApp = require('./src/app')
const startDb = require('./src/db')
require('dotenv').config()

let serverRetryStarter = 3

const startServer = async () => {
    try {
        const { mongo } = await startDb()
        console.log(`[${new Date().toLocaleTimeString()}]: DB connection created`)
        startApp({ mongo })
    } catch (error) {
        if (error.name === 'MongoNetworkError' && serverRetryStarter > 0) {
            console.log(`[${new Date().toLocaleTimeString()}]: MongoNetworkError, retry attempt left: ${serverRetryStarter}`)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 5000)
            })
            serverRetryStarter--
            startServer()
        } else {
            throw new Error(serverRetryStarter === 0
                ? 'Server could not start after 3 attempt... DB Connection could not be established'
                : 'Server could not start...' + error.message
            )
        }
    }

}

startServer()