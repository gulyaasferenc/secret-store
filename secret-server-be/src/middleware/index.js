const validate = require('./validate')

module.exports = ({ logIt }) => {
    return { validator: validate({ logIt }) }
}