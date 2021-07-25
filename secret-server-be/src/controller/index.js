const handleSecrets = require('./handleSecrets')

module.exports = ({ mongo, logIt, secrets }) => {
    return {
        handleSecrets: handleSecrets({ mongo, logIt, secrets })
    }
}