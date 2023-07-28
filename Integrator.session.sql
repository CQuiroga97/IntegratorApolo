create database integrator;
use integrator;
create table integral(idIntegral int identity(1,1) PRIMARY KEY, estado int);
create table pregunta(idPregunta int identity(1,1) PRIMARY KEY, urlImagen varchar(120));
create table universidad(idUniversidad int identity(1,1) PRIMARY KEY, nombre varchar(200), sede varchar(200), pais varchar(200), cantParticipantes int, correo varchar(200));
create table participante(idParticipante int identity(1,1) PRIMARY KEY, nombre varchar(200), email varchar(200), pass varchar(60), universidad int, FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad));
create table seriales(serial varchar(25) PRIMARY KEY, estado int,  universidad int, FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad));
create table encuentro(idEncuentro int identity(1,1) PRIMARY KEY, estado int, ronda int);
create table encuentroParticipante(participante int, encuentro int, FOREIGN KEY(participante) REFERENCES participante(idParticipante), FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro));
create table puntoRonda(hora date, participante int, encuentro int, integral int, FOREIGN KEY(participante) REFERENCES participante(idParticipante), FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro), FOREIGN KEY(integral) REFERENCES integral(idIntegral));
create table admin(idAdmin int identity(1,1) PRIMARY KEY, nombre varchar(250), contraseña varchar(200));
create table jurado(idJurado int identity(1,1) PRIMARY KEY, nombre varchar(250), contraseña varchar(200), correo varchar(300));
create table contacto(nombre varchar(200), descripcion varchar(500), correo varchar(300), hora date);

CREATE TABLE respuestas (
    idRespuesta INT IDENTITY(1, 1) PRIMARY KEY,
    numeroIntegral INT,
    numeroRespuesta INT,
    tiempoRespuestaSegundos INT,
    participante INT,
    FOREIGN KEY (participante) REFERENCES participante(idParticipante)
);
ALTER TABLE encuentro ADD minutos int, segundos int;

insert into encuentro values (0, 0, 4, 30);
select * from encuentro
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
exec loginAdmin "adminAmerica", "c67e40d217b9a543bdaad0ce9ec6e41e"
exec loginAdmin "adminAmerica2", "25f9e794323b453885f5181f1b624d0b"
exec crearAdmin "adminAmerica2", "25f9e794323b453885f5181f1b624d0b" //123456789
go
create procedure sp_getUniversidades
    as
        select 
            universidad.*
        from
            universidad;
        
go
create procedure sp_setParticipantes @nombre varchar(200), @email varchar(200), @pass varchar(60), @universidad int
    as
        insert into participante values (@nombre, @email, @pass, @universidad)
go


create procedure sp_setUniversidad @nombre varchar(200), @pais varchar(200), @sede varchar(200), @cantidad int, @correo varchar(200)
	as
		insert into universidad values (@nombre, @sede, @pais, @cantidad, @correo);
go
create procedure sp_setUniversidadList @universidades nvarchar(max)
	as
        begin
			declare @counter int
			declare @cantidad int
            set @counter = 0
            set @cantidad = (SELECT count(*) FROM OpenJson(@universidades))
            while (@counter < @cantidad)
                begin
					declare @json as nvarchar(max)
					set @json = (
						Select value From OpenJson(@universidades) where [key] = @counter
					)
					declare @counter2 int
					declare @cantidad2 int
					declare @query nvarchar(max)
					set @query = 'insert into universidad values ('
					set @counter2 = 0
					set @cantidad2 = (SELECT count(*) FROM OpenJson(@json))
					while (@counter2 < @cantidad2)
						begin
							if @counter2 < 4
								set @query = @query+ '''' + (select [value] from OpenJson(@json) where [key] = @counter2) + ''','
							else
								set @query = @query + '''' + (select [value] from OpenJson(@json) where [key] = @counter2) + ''')'
							set @counter2 = @counter2 + 1
						end
						exec (@query)
					
					
					
                    set @counter = @counter + 1
                end
        end
go
delete from participante;
delete from universidad;

create procedure sp_getParticipantesByUniversidad
	as
		declare @cantUni as int
		declare @count as int
		set @cantUni = (select count(*) from universidad)
		set @count = 0
		while @count < @cantUni
			begin
				select * from participante where participante.universidad = (
					select uni.idUniversidad
						From (select ROW_NUMBER() OVER (Order by idUniversidad asc)  as Row, universidad.idUniversidad from universidad ) uni
						where Row = @count + 1
				)
				set @count = @count + 1
			end
go
create procedure sp_getParticipantesByUniversidad
	as
		declare @cantUni as int
		declare @count as int
		set @cantUni = (select count(*) from universidad)
		set @count = 0
		while @count < @cantUni
			begin
				select * from participante where participante.universidad = (
					select uni.idUniversidad
						From (select ROW_NUMBER() OVER (Order by idUniversidad asc)  as Row, universidad.idUniversidad from universidad ) uni
						where Row = @count + 1
				);
				select uni.*
						From (select ROW_NUMBER() OVER (Order by idUniversidad asc)  as Row, universidad.* from universidad ) uni
						where Row = @count + 1
				set @count = @count + 1
			end

go
drop procedure sp_setParticipanteList 
create procedure sp_setParticipanteList @participantes nvarchar(max)
	as
        begin
			declare @counter int
			declare @cantidad int
            set @counter = 0
            set @cantidad = (SELECT count(*) FROM OpenJson(@participantes))
            while (@counter < @cantidad)
				
                begin
					declare @json as nvarchar(max)
					set @json = (
						Select value From OpenJson(@participantes) where [key] = @counter
					)
					declare @counter2 int
					declare @cantidad2 int
					declare @query nvarchar(max)
					set @query = 'insert into participante values ('
					set @counter2 = 0
					set @cantidad2 = (SELECT count(*) FROM OpenJson(@json))
					while (@counter2 < @cantidad2)
						begin
							
							if @counter2 < 3
								set @query = @query+ '''' + (select [value] from OpenJson(@json) where [key] = @counter2) + ''','
							else
								set @query = @query + '''' + (select [value] from OpenJson(@json) where [key] = @counter2) + ''')'
							set @counter2 = @counter2 + 1
						end
						print @query
						exec (@query)
					
					
					
                    set @counter = @counter + 1
                end
        end
go
select * from participante;

DROP PROCEDURE spGetUniversidadesParticipantes

CREATE PROCEDURE spGetUniversidadesParticipantes
AS
BEGIN
    SELECT
        u.idUniversidad,
        u.nombre AS nombreUniversidad,
        u.sede,
        u.pais,
        u.cantParticipantes,
        u.correo,
        (
            SELECT
                p.idParticipante,
                p.nombre AS nombreParticipante,
                p.email,
                p.pass
            FROM
                participante p
            WHERE
                p.universidad = u.idUniversidad
            FOR JSON PATH
        ) AS participantes
    FROM
        universidad u
END;

CREATE PROCEDURE spBorrarUniversidadesEstudiantes
    @idUniversidad INT
AS
BEGIN
    -- Eliminar los participantes asociados a la universidad
    DELETE FROM participante
    WHERE universidad = @idUniversidad;

    -- Eliminar la universidad
    DELETE FROM universidad
    WHERE idUniversidad = @idUniversidad;
END;
CREATE PROCEDURE spModificarUniversidad
    @idUniversidad INT,
    @nombre VARCHAR(200),
    @sede VARCHAR(200),
    @pais VARCHAR(200),
    @cantParticipantes INT,
    @correo VARCHAR(200)
AS
BEGIN
    UPDATE universidad
    SET nombre = @nombre,
        sede = @sede,
        pais = @pais,
        cantParticipantes = @cantParticipantes,
        correo = @correo
    WHERE idUniversidad = @idUniversidad;
END;
CREATE PROCEDURE spBorrarParticipante
    @idParticipante INT
AS
BEGIN
    DELETE FROM participante
    WHERE idParticipante = @idParticipante;
END;
CREATE PROCEDURE spInsertarParticipante
    @nombre VARCHAR(200),
    @email VARCHAR(200),
    @pass VARCHAR(60),
    @universidad INT
AS
BEGIN
    INSERT INTO participante (nombre, email, pass, universidad)
    VALUES (@nombre, @email, @pass, @universidad);
END;
CREATE PROCEDURE spModificarParticipante
    @idParticipante INT,
    @nombre VARCHAR(200),
    @email VARCHAR(200),
    @pass VARCHAR(60),
    @universidad INT
AS
BEGIN
    UPDATE participante
    SET nombre = @nombre,
        email = @email,
        pass = @pass,
        universidad = @universidad
    WHERE idParticipante = @idParticipante;
END;
CREATE PROCEDURE spModificarContrasenaParticipante
    @correo VARCHAR(200),
    @nuevaContrasena VARCHAR(60)
AS
BEGIN
    UPDATE participante
    SET pass = @nuevaContrasena
    WHERE email = @correo;
END;
select * from participante;


CREATE PROCEDURE loginParticipante
    @email VARCHAR(200),
    @pass VARCHAR(200)
AS
BEGIN
    SELECT
        p.idParticipante AS idParticipante,
        p.nombre AS nombreParticipante,
        universidad AS universidadParticipante,
        p.email AS emailParticipante,
        u.nombre AS nombreUniversidad
    FROM
        participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    WHERE
        p.email = @email
        AND p.pass = @pass;
END;

CREATE PROCEDURE spGuardarRespuestaParticipante
    @numeroIntegral INT,
    @numeroRespuesta INT,
    @tiempoRespuestaSegundos INT,
    @idParticipante INT
AS
BEGIN
    INSERT INTO respuestas (numeroIntegral, numeroRespuesta, tiempoRespuestaSegundos, participante)
    VALUES (@numeroIntegral, @numeroRespuesta, @tiempoRespuestaSegundos, @idParticipante);
END;
select * from respuestas

CREATE PROCEDURE spGetTimerClasificaciones
    @id INT
AS
BEGIN
    SELECT minutos as minutos, segundos as segundos from encuentro where encuentro.idEncuentro = @id
END;
