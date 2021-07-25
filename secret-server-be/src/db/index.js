const mongoose = require('mongoose')
const schema = require('./schema')({ mongoose })

module.exports = async ({ logIt }) => {
    const mongoConnection = await mongoose.createConnection(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoConnection.model('Hash', schema.hash)

    logIt.success('DB connection created')

    return {
        mongo: mongoConnection
    }
}