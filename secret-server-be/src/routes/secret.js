const router = require('express').Router()
const secretController = require('../controller')
const middleware = require('../middleware')

module.exports = ({ mongo, logIt, secrets }) => {

    const {
        validateSaveSecretInput
    } = middleware({ logIt }).validator

    const { saveSecret, getSecret } = secretController({ mongo, logIt, secrets }).handleSecrets

    router.get('/:hash', getSecret)

    router.post('/', validateSaveSecretInput, saveSecret)

    return router
}