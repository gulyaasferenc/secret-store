module.exports = ({ mongo }) => {

    const Hash = mongo.models.Hash

    const saveSecret = async (req, res) => {
        try {
            const hashToSave = new Hash({
                ...req.body,
                remainingViews: req.body.expireAfterViews
            })
            const result = await hashToSave.save()
            res.status(201).json(result)
        } catch (error) {
            console.log('error: ' + error.message)
            res.status(500).json({ error: error.message })
        }

    }

    const getSecret = async (req, res) => {
        try {
            const result = await Hash.findOne(
                { hash: req.params.hash }

            )
            if (result) {
                result.remainingViews = result.remainingViews - 1

                const updatedResult = await result.save()

                if (result.remainingViews <= 0) {
                    await result.deleteOne()
                }
                return res.status(200).json(updatedResult)
            }

            res.status(404).json({ message: 'Secret not found' })
        } catch (error) {
            console.log('error: ' + error.message)
            res.status(500).json({ error: error.message })
        }
    }

    return {
        saveSecret,
        getSecret
    }
}