const express = require('express')
const app = express()
const cors = require('cors');

const routes = require('./routes')

module.exports = ({ mongo, logIt, secrets }) => {
    app.use(cors())
    app.use(express.json())
    app.use('/api', routes({ mongo, logIt, secrets }))

    app.listen(process.env.PORT, () => {
        logIt.success(`Server is listening on PORT: ${process.env.PORT}`)
    })
}