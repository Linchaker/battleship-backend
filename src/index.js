const express = require('express')
const http = require('http');
const config = require('./config')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { Server } = require("socket.io");
const { authenticateSocket } = require("./middleware/authenticateSocket")
const apiRoutes = require('./routes/api');
const { shotHandler } = require('./services/shot-service');
// const authRoutes = require('./routes/auth')

// const varMiddleware = require('./middleware/variables')
// const userMiddleware = require('./middleware/user')


const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.FRONT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(morgan('combined'))
app.use(bodyParser.json())
const corsConf = {
  origin: config.FRONT_URL,
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

  
  io.on('connection', (socket) => {
    console.log('Connected to WebSocket');
    authenticateSocket(socket, (error) => {
      if (error) {
        console.log('Socket auth error:', error.message);
        socket.disconnect();
      } else {
        console.log('Socket auth successfully');
        
        socket.on('playerShot', async ({ gameId, position }, callback) => {
          try {
            const updatedGameData = await shotHandler(socket.user, gameId, position)
            callback({ success: true, message: "Shot success" });
            io.emit('gameUpdate', updatedGameData.game);
          } catch (error) {
            callback({ success: false, message: "Shot error", error });
          }
        });
      
        // Обработка других событий и сообщений от клиента WebSocket
        // Добавьте обработку событий в соответствии с логикой вашей игры
      
        // ...
      
        // Отправка обновленного состояния игры всем подключенным клиентам
        // Например, после обновления состояния игры на сервере:
        // io.emit('gameUpdate', updatedGameData);



      }
    });
  });
  
  server.listen(4000, () => {
    console.log('Сервер Socket.io запущен на порту 4000');
  });
      

  app.listen(config.PORT, config.HOST, (error) => {
    error ? console.log(error) : console.log(`Server running at http://${config.HOST}:${config.PORT}/`);
  })
  } catch (e) {
    console.log(e);
  }
}

start()