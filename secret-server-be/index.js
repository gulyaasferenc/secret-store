const startApp = require('./src/app')
const startDb = require('./src/db')
const startCron = require('./src/cron/cron')
require('dotenv').config()

const { logIt, secrets } = require('./src/utils')

let serverRetryStarter = 3

const startServer = async () => {
    try {
        const { mongo } = await startDb({ logIt })
        startApp({ mongo, logIt, secrets })
        startCron({ mongo, logIt })
    } catch (error) {
        if (serverRetryStarter > 0) {
            logIt.error(`MongoNetworkError, retry attempt left: ${serverRetryStarter}`)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 5000)
            })
            serverRetryStarter--
            startServer()
        } else {
            logIt.error('Server could not start after 3 attempt...' + error.message)
            throw new Error(message)
        }
    }

}

startServer()
