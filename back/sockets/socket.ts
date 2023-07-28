import socketIO, { Socket } from 'socket.io';
import { User } from './user';
import { Competencia } from './competencia';
export const disconnectClient = (client: Socket, io: socketIO.Server) => {
  client.on('disconnect', () => {
    User.removeUser(client.id);
    io.emit('users-online', User.getUserList());
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
    client.emit('getEstadoClasificatorias', Competencia.getEstadoClasificatorias());
  })
}