
// const User = require('./sockets/user')
// const UserSegundaRonda = require('./sockets/usersSegundaRonda')
// const socket = require('./sockets/socket')
const http = require('https')
const Server = require('socket.io')
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = (process.env.PORT || 8080);
const indexRouter = require("./routes/router.js")
const httpServer = new http.Server(app);
const server = http.createServer();
app.get('/integralesFinales/*', function(req, res, next){
  if(req.query["key"]=="akjjyglc")
    next()
  else
    res.send("Acceso prohibido");
}) 
app.use(cors());
app.use(bodyParser.json({limit: '1050mb'}));
app.use(bodyParser.urlencoded({limit: '1050mb', extended: true}));
app.use("/api", indexRouter);
app.use('/images', express.static(path.join(__dirname, 'controllers/integrales')));
app.use('/integralesFinales', express.static(path.join(__dirname, 'controllers/integralesFinales')));
// const io = new Server(httpServer, { cors: { origin: '*' } });

// io.on('connection', (client) => {
//   // Primera ronda
//   io.emit('users-online', User.getUserList());
//   io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList());
//   socket.disconnectClient(client, io);
//   socket.addUserOnline(client, io);
//   socket.removeUserOnline(client, io);
//   socket.iniciarClasificatorias(client, io)
//   socket.getEstadoClasificatorias(client, io)
//   socket.setIntegral(client, io)
//   socket.editarTexto(client, io)
//   socket.pedirLlamada(client, io)
//   socket.iniciarIntegral(client, io)
//   socket.participantePreparado(client, io)
//   socket.iniciarCronometro(client, io)
//   socket.pausarCronometro(client, io)
//   socket.confirmarTiempo(client, io)
//   socket.conectarCamara(client, io)
//   socket.sumarPuntaje(client, io)
//   socket.finalizar(client, io)
//   // Segunda ronda
//   socket.loginSegundaRonda(client, io)
// });
httpServer.listen(port, () => {
  console.log(process.env.SERVER)
  console.log(process.env.USERDB)
  console.log(process.env.PASSWORD)
  console.log(process.env.DATABASE)
  console.log("Server iniciado");
});
