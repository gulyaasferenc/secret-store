const router = require('express').Router()
const secretController = require('../controller')

module.exports = ({ mongo }) => {

    const { saveSecret, getSecret } = secretController({ mongo }).handleSecrets

    router.get('/:hash', getSecret)

    router.post('/', saveSecret)

    return router
}