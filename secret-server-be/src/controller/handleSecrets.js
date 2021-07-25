const moment = require('moment')

module.exports = ({ mongo, logIt, secrets }) => {

    const Hash = mongo.models.Hash

    const saveSecret = async (req, res) => {
        try {
            const hashToSave = new Hash({
                hash: secrets.encrypt(req.body.secret),
                remainingViews: req.body.expireAfterViews && req.body.expireAfterViews !== 0 ? req.body.expireAfterViews : null,
                expireAfterViews: req.body.expireAfterViews || null,
                expiresAt: req.body.expireAfter ? moment().add(req.body.expireAfter, 'm') : null
            })
            const result = await hashToSave.save()
            res.status(201).json(result)
        } catch (error) {
            logIt.error('error: ' + error.message)
            res.status(500).json({ error: error.message })
        }

    }

    const getSecret = async (req, res) => {
        try {
            let result = await Hash.findOne(
                { hash: req.params.hash }
            )
            if (result) {
                if (result.expireAfterViews !== 0) {
                    result.remainingViews = result.remainingViews - 1

                    result = await result.save()

                    if (result.remainingViews <= 0) {
                        await result.deleteOne()
                    }
                }

                const response = {
                    hash: result.hash,
                    secretText: secrets.decrypt(result.hash),
                    createdAt: result.createdAt,
                    expiresAt: result.expiresAt,
                    remainingViews: result.remainingViews

                }

                return res.status(200).json(response)
            }

            res.status(404).json({ message: 'Secret not found' })
        } catch (error) {
            logIt.error('error: ' + error.message)
            res.status(500).json({ error: error.message })
        }
    }

    return {
        saveSecret,
        getSecret
    }
}