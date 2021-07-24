const express = require('express')
const app = express()

const routes = require('./routes')

module.exports = ({ mongo }) => {
    app.use(express.json())
    app.use('/api', routes({ mongo }))

    app.listen(process.env.PORT, () => {
        console.log(`[${new Date().toLocaleTimeString()}]: Server is listening on ${process.env.PORT}`)
    })
}