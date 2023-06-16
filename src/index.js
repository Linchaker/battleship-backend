const express = require('express')
const config = require('./config')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const apiRoutes = require('./routes/api')
// const authRoutes = require('./routes/auth')

// const varMiddleware = require('./middleware/variables')
// const userMiddleware = require('./middleware/user')


const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
const corsConf = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsConf));

app.use(express.json())

// custom middleware
// app.use(varMiddleware)
// app.use(userMiddleware)
app.get('/', (req, res) => {
    res.json({"home": true})
});
app.use('/api', apiRoutes)
// app.use('/auth', authRoutes)


async function start() {
  try {
    await mongoose
      .connect(config.MONGO_CONNECT, {useNewUrlParser: true})
      .then((res) => console.log('Connected to DB'))
      .catch((error) => console.log(error));

  app.listen(config.PORT, config.HOST, (error) => {
    error ? console.log(error) : console.log(`Server running at http://${config.HOST}:${config.PORT}/`);
  })
  } catch (e) {
    console.log(e);
  }
}

start()