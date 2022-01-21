const express = require('express')
const app = express()

const api = require('./src/api')

const path = require('path')

app.listen('3000', () => {
    console.log('Runing')
})

app.use(express.json())

app.use('/api/v1', api)

app.use((req, res) => {
    res.status(404).send('404')
})

app.use((error, req, res, next) => {})
