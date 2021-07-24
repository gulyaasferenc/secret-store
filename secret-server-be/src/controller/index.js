const handleSecrets = require('./handleSecrets')

module.exports = ({ mongo }) => {
    return {
        handleSecrets: handleSecrets({ mongo })
    }
}