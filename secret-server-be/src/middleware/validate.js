const Joi = require('joi')

const saveSecret = Joi.object({
    secret: Joi.string().required(),
    expireAfterViews: Joi.number().greater(-1).integer().allow(null),
    expireAfter: Joi.number().greater(-1).integer().allow(null)
})


module.exports = ({ logIt }) => {
    const validateSaveSecretInput = (req, res, next) => {
        const { error } = saveSecret.validate(req.body)
        if (error) {
            logIt.error(error.message)
            return res.status(400).json({ message: error.message })
        }
        next()
    }

    return { validateSaveSecretInput }
}