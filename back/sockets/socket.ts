import socketIO, { Socket } from 'socket.io';
import { User } from './user';
import { UserSegundaRonda } from './usersSegundaRonda';
import { Competencia } from './competencia';
export const disconnectClient = (client: Socket, io: socketIO.Server) => {
  client.on('disconnect', () => {
    User.removeUser(client.id);
    io.emit('users-online', User.getUserList());
    UserSegundaRonda.removeUser(client.id);
    io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList());
  });
};

export const addUserOnline = (client: Socket, io: socketIO.Server) => {
  client.on('add-user', (payload) => {
    payload.id = client.id;
    payload.integral = 0;
    User.addUser(payload);
    io.to(client.id).emit('user-id', client.id);
    io.emit('users-online', User.getUserList());
  });
};
export const setIntegral = (client: Socket, io: socketIO.Server) =>{
  client.on('setIntegral', (integral) =>{
    User.setIntegral(client.id, integral);
    io.emit('users-online', User.getUserList());
  })
}
export const removeUserOnline = (client: Socket, io: socketIO.Server) => {
  client.on('exit', () => {
    UserSegundaRonda.removeUser(client.id);
    io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList());
    User.removeUser(client.id);
    io.emit('users-online', User.getUserList());
  });
};
export const iniciarClasificatorias = (client: Socket, io: socketIO.Server) =>{
  client.on('iniciarClasificatorias', ()=>{
    Competencia.setEstadoClasificatorias();
    io.emit('getEstadoClasificatorias', Competencia.getEstadoClasificatorias());
  })
}
export const getEstadoClasificatorias = (client: Socket, io: socketIO.Server) =>{
  client.on('getEstadoClasificatorias', ()=>{
    console.log("asd")
    client.emit('getEstadoClasificatorias', Competencia.getEstadoClasificatorias());
  })
}
export const loginSegundaRonda = (client:Socket, io: socketIO.Server)=>{
  client.on("loginSegundaRonda", (payload, clasificacion)=>{
    payload.id = client.id;
    payload.clasificacion = clasificacion;
    UserSegundaRonda.addUser(payload)
    io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList())
  })
}
export const editarTexto = (client: Socket, io: socketIO.Server) =>{
  client.on('editarTexto', (texto) =>{
    UserSegundaRonda.setTexto(client.id, texto);
    io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList());
  })
}
export const pedirLlamada = (client: Socket, io: socketIO.Server) =>{
  client.on('pedirLlamada', ()=>{
    io.emit('usersOnlineSegunda', UserSegundaRonda.getUserList())
  })
}
export const iniciarIntegral = (client: Socket, io: socketIO.Server) =>{
  client.on('iniciarIntegral', ()=>{
    io.emit('iniciarIntegralParticipante', UserSegundaRonda.getUserList())
  })
}
export const participantePreparado = (client: Socket, io: socketIO.Server) =>{
  client.on('participantePreparado', (estado)=>{
    UserSegundaRonda.setEstado(client.id, estado);
    if(estado)
      io.emit('usuariosPreparados', UserSegundaRonda.getUserList())
  })
}
export const iniciarCronometro = (client: Socket, io: socketIO.Server) =>{
  client.on('iniciarCronometro', ()=>{
    io.emit('iniciarCronometroParticipante')
  })
}
export const pausarCronometro = (client: Socket, io: socketIO.Server) =>{
  client.on('pausarCronometro', (participante:any)=>{
    io.emit('pausarCronometroStream', participante)
  })
}
export const confirmarTiempo = (client: Socket, io: socketIO.Server) =>{
  client.on('confirmarTiempo', (data:any)=>{
    io.emit('confirmarTiempoParticipante', data)
  })
}
export const sumarPuntaje = (client: Socket, io: socketIO.Server) =>{
  client.on('sumarPuntaje',()=>{
    io.emit('sumarPuntajeParticipante')
  })
}
export const conectarCamara = (client: Socket, io: socketIO.Server) =>{
  client.on('conectarCamara',()=>{
    io.emit('volverALlamar', UserSegundaRonda.getUserList())
  })
}
export const finalizar = (client: Socket, io: socketIO.Server) =>{
  client.on('finalizar',()=>{
    io.emit('finalizarParticipante', UserSegundaRonda.getUserList())
  })
}