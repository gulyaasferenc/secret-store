const startApp = require('./src/app')
const startDb = require('./src/db')
require('dotenv').config()

const { logIt, secrets } = require('./src/utils')

let serverRetryStarter = 3

const startServer = async () => {
    try {
        const { mongo } = await startDb({ logIt })
        startApp({ mongo, logIt, secrets })
    } catch (error) {
        if (serverRetryStarter > 0) {
            logIt.error(`${error.message}, retry attempt left: ${serverRetryStarter}`)
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 5000)
            })
            serverRetryStarter--
            startServer()
        } else {
            logIt.error('Server could not start after 3 attempt...' + error.message)
            process.exit()
        }
    }

}

startServer()
