const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const app = express()


const PORT_LISTEN = process.env.PORT_LISTEN || 5000
const MONGO_URI =  process.env.MONGO_URI


app.use(cors())


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', require('./routers/auth.route') )
app.use('/api', require('./routers/systems.route') )
app.use('/api/uploads', require('./routers/schemes.route') )


async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT_LISTEN, () => console.log('Сервер запущен на ' + PORT_LISTEN))
    }
    catch (e) {
        console.log('Server Error',e.message)
        process.exit(1)
    }
}


start()

