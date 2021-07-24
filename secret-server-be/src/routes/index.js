const router = require('express').Router()
const hash = require('./secret')

module.exports = ({ mongo }) => {

    router.use('/secret', hash({ mongo }))

    return router
}