const hash = require('./hash')

module.exports = ({ mongoose }) => {
    return { hash: hash({ mongoose }) }
}
