const mongoose = require('mongoose')
const schema = require('./schema')({ mongoose })

module.exports = async () => {
    const mongoConnection = await mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoConnection.model('Hash', schema.hash)

    return {
        mongo: mongoConnection
    }
}