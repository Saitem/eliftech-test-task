// require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const config = require('../config.json')

const app = express()

const PORT = 5000

const bankRoute = require('./routes/bank.route')
const authRoute = require('./routes/user.route')
const mortgageRoute = require('./routes/mortgage.route')

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(bankRoute)
app.use(authRoute)
app.use(mortgageRoute)

mongoose.connect(
    `mongodb+srv://${config.common.MONGO_USER}:${config.common.MONGO_PASS}@cluster0.o5e2x.mongodb.net/${config.common.MONGO_DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) {
        console.log(err)
      }
      console.log('Сonnection established')
    }
  )



app.listen(PORT, () => console.log(`Server working on port ${PORT}`))




