const moment = require('moment')

const logIt = {
    success: (message) => {
        console.log(
            '\x1b[32m',
            `[${moment().toLocaleString()}]:`,
            message,
            '👍',
            '\x1b[0m',
            '\n'
        )
    },
    log: (message) => {
        console.log(
            `[${moment().toLocaleString()}]:`,
            message,
            '\n'
        )
    },
    error: (message) => {
        console.log(
            '\x1b[31m',
            `[${moment().toLocaleString()}]:`,
            message,
            '❌ ',
            '\x1b[0m',
            '\n'
        )
    }
}

module.exports = logIt