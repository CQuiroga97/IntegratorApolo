import { Server } from 'socket.io';
import * as socket from './sockets/socket';
import { User } from './sockets/user';
import http from 'http';
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = (process.env.PORT || 3000);
const indexRouter = require("./routes/router.js")
const httpServer = new http.Server(app);
const server = http.createServer();
app.use(cors());
app.use(bodyParser.json({limit: '1050mb'}));
app.use(bodyParser.urlencoded({limit: '1050mb', extended: true}));
app.use("/api", indexRouter);
app.use('/images', express.static(path.join(__dirname, 'controllers/integrales')));
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client:any) => {
  io.emit('users-online', User.getUserList());

  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.removeUserOnline(client, io);
  socket.iniciarClasificatorias(client, io)
  socket.getEstadoClasificatorias(client, io)
  socket.setIntegral(client, io)
});
httpServer.listen(port, () => {
  console.log("Server iniciado");
});
