const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const department_controller = require('./department_controller')
const product_controller = require('./product_controller')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/http_app', { useNewUrlParser: true })

app.use('/departments', department_controller)
app.use('/products', product_controller)

app.listen(9000)