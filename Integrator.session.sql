create database integrator;
use integrator;
create table integral(idIntegral int identity(1,1) PRIMARY KEY, estado int);
create table pregunta(idPregunta int identity(1,1) PRIMARY KEY, urlImagen varchar(120));
create table respuestas(idRespuesta int identity(1,1) PRIMARY KEY, urlImagen varchar(120), valor int, pregunta int, FOREIGN KEY (pregunta) REFERENCES pregunta(idPregunta));
create table universidad(idUniversidad int identity(1,1) PRIMARY KEY, nombre varchar(200), sede varchar(200), pais varchar(200), cantParticipantes int, correo varchar(200));
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