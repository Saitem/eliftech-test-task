require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const PORT = 5000

const bankRoute = require('./routes/bank.route')
const authRoute = require('./routes/user.route')

app.use(express.json())
app.use(cors())

app.use(bankRoute)
app.use(authRoute)

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.o5e2x.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
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




