create database integrator;
use integrator;
create table integral(idIntegral int identity(1,1) PRIMARY KEY, estado int);
create table pregunta(idPregunta int identity(1,1) PRIMARY KEY, urlImagen varchar(120));
create table respuestas(idRespuesta int identity(1,1) PRIMARY KEY, urlImagen varchar(120), valor int, pregunta int, FOREIGN KEY (pregunta) REFERENCES pregunta(idPregunta));
create table universidad(idUniversidad int identity(1,1) PRIMARY KEY, nombre varchar(200), sede varchar(200), pais varchar(200), cantParticipantes int);
create table participante(idParticipante int identity(1,1) PRIMARY KEY, nombre varchar(200), email varchar(200), pass varchar(60), universidad int, FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad));
create table seriales(serial varchar(25) PRIMARY KEY, estado int,  universidad int, FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad));
create table puntaje(hora date, tiempo int, totalPuntaje int, respuesta int, participante int, FOREIGN KEY (respuesta) REFERENCES respuestas(idRespuesta), FOREIGN KEY (participante) REFERENCES participante(idParticipante));
create table encuentro(idEncuentro int identity(1,1) PRIMARY KEY, estado int, ronda int);
create table encuentroParticipante(participante int, encuentro int, FOREIGN KEY(participante) REFERENCES participante(idParticipante), FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro));
create table puntoRonda(hora date, participante int, encuentro int, integral int, FOREIGN KEY(participante) REFERENCES participante(idParticipante), FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro), FOREIGN KEY(integral) REFERENCES integral(idIntegral));
create table admin(idAdmin int identity(1,1) PRIMARY KEY, nombre varchar(250), contraseña varchar(200));
create table jurado(idJurado int identity(1,1) PRIMARY KEY, nombre varchar(250), contraseña varchar(200), correo varchar(300));
create table contacto(nombre varchar(200), descripcion varchar(500), correo varchar(300), hora date);

go
create procedure crearAdmin @nombre varchar(250), @pass varchar(200)
as
	insert into admin values (@nombre, @pass);
go
create procedure loginAdmin @nombre varchar(250), @pass varchar(200)
as
	declare @result int;
	set @result = (select idAdmin from admin where nombre = @nombre AND contraseña = @pass);
	select "resultado" = @result;
go
select * from admin;
exec loginAdmin "adminAmericaw", "c67e40d217b9a543bdaad0ce9ec6e41e"

go
create procedure sp_getUniversidades
    as
        select 
            universidad.nombre, universidad.sede, universidad.pais, universidad.cantParticipantes 
        from
            universidad;
        
go
create procedure sp_setParticipantes @nombre varchar(200), @email varchar(200), @pass varchar(60), @universidad int
    as
        insert into participante values (@nombre, @email, @pass, @universidad)
go

exec sp_setParticipantes "Prueba", "Prueba", "Prueba", 1
select * from participante;
