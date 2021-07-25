const router = require('express').Router()
const hash = require('./secret')

module.exports = ({ mongo, logIt, secrets }) => {

    router.use('/secret', hash({ mongo, logIt, secrets }))

    return router
}