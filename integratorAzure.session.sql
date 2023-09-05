create table integral
(
    idIntegral int identity(1,1) PRIMARY KEY,
    estado int
);
create table pregunta
(
    idPregunta int PRIMARY KEY,
    urlImagen varchar(120),
    correcta int
);
create table universidad
(
    idUniversidad int identity(1,1) PRIMARY KEY,
    nombre varchar(200),
    sede varchar(200),
    pais varchar(200),
    cantParticipantes int,
    correo varchar(200)
);
create table participante
(
    idParticipante int identity(1,1) PRIMARY KEY,
    nombre varchar(200),
    email varchar(200),
    pass varchar(60),
    universidad int,
    FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad)
);
create table seriales
(
    serial varchar(25) PRIMARY KEY,
    estado int,
    universidad int,
    FOREIGN KEY (universidad) REFERENCES universidad(idUniversidad)
);
create table encuentro
(
    idEncuentro int identity(1,1) PRIMARY KEY,
    estado int,
    ronda int
);
create table encuentroParticipante
(
    participante int,
    encuentro int,
    FOREIGN KEY(participante) REFERENCES participante(idParticipante),
    FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro)
);
create table puntoRonda
(
    hora date,
    participante int,
    encuentro int,
    integral int,
    FOREIGN KEY(participante) REFERENCES participante(idParticipante),
    FOREIGN KEY(encuentro) REFERENCES encuentro(idEncuentro),
    FOREIGN KEY(integral) REFERENCES integral(idIntegral)
);
create table admin
(
    idAdmin int identity(1,1) PRIMARY KEY,
    nombre varchar(250),
    contraseña varchar(200)
);
create table jurado
(
    idJurado int identity(1,1) PRIMARY KEY,
    nombre varchar(250),
    contraseña varchar(200),
    correo varchar(300)
);
create table contacto
(
    nombre varchar(200),
    descripcion varchar(500),
    correo varchar(300),
    hora date
);

CREATE TABLE respuestas
(
    idRespuesta INT IDENTITY(1, 1) PRIMARY KEY,
    numeroIntegral INT,
    numeroRespuesta INT,
    tiempoRespuestaSegundos INT,
    participante INT,
    FOREIGN KEY (participante) REFERENCES participante(idParticipante)
);
ALTER TABLE encuentro ADD minutos int, segundos int;
ALTER TABLE participante ADD puntaje int;
ALTER TABLE participante ALTER COLUMN puntaje float;
ALTER TABLE respuestas ADD tiempoCompleto varchar(max)
insert into encuentro
values
    (0, 0, 4, 30);


create procedure crearAdmin
    @nombre varchar(250),
    @pass varchar(200)
as
insert into admin
values
    (@nombre, @pass);
go
create procedure loginAdmin
    @nombre varchar(250),
    @pass varchar(200)
as
declare @result int;
set @result = (select idAdmin
from admin
where nombre = @nombre AND contraseña = @pass);
select "resultado" = @result;
go
select *
from admin;
exec crearAdmin "adminAmerica2", "25f9e794323b453885f5181f1b624d0b" 
go
create procedure sp_getUniversidades
as
select
    universidad.*
from
    universidad;
        
go
create procedure sp_setParticipantes
    @nombre varchar(200),
    @email varchar(200),
    @pass varchar(60),
    @universidad int
as
insert into participante
values
    (@nombre, @email, @pass, @universidad)
go


create procedure sp_setUniversidad
    @nombre varchar(200),
    @pais varchar(200),
    @sede varchar(200),
    @cantidad int,
    @correo varchar(200)
as
insert into universidad
values
    (@nombre, @sede, @pais, @cantidad, @correo);
go
create procedure sp_setUniversidadList
    @universidades nvarchar(max)
as
begin
    declare @counter int
    declare @cantidad int
    set @counter = 0
    set @cantidad = (SELECT count(*)
    FROM OpenJson(@universidades))
    while (@counter < @cantidad)
                begin
        declare @json as nvarchar(max)
        set @json = (
						Select value
        From OpenJson(@universidades)
        where [key] = @counter
					)
        declare @counter2 int
        declare @cantidad2 int
        declare @query nvarchar(max)
        set @query = 'insert into universidad values ('
        set @counter2 = 0
        set @cantidad2 = (SELECT count(*)
        FROM OpenJson(@json))
        while (@counter2 < @cantidad2)
						begin
            if @counter2 < 4
								set @query = @query+ '''' + (select [value]
            from OpenJson(@json)
            where [key] = @counter2) + ''','
							else
								set @query = @query + '''' + (select [value]
            from OpenJson(@json)
            where [key] = @counter2) + ''')'
            set @counter2 = @counter2 + 1
        end
        exec (@query)



        set @counter = @counter + 1
    end
end
go

create procedure sp_getParticipantesByUniversidad
as
declare @cantUni as int
declare @count as int
set @cantUni = (select count(*)
from universidad)
set @count = 0
while @count < @cantUni
			begin
    select *
    from participante
    where participante.universidad = (
					select uni.idUniversidad
    From (select ROW_NUMBER() OVER (Order by idUniversidad asc)  as Row, universidad.idUniversidad
        from universidad ) uni
    where Row = @count + 1
				);
    select uni.*
    From (select ROW_NUMBER() OVER (Order by idUniversidad asc)  as Row, universidad.*
        from universidad ) uni
    where Row = @count + 1
    set @count = @count + 1
end

go
create procedure sp_setParticipanteList
    @participantes nvarchar(max)
as
begin
    declare @counter int
    declare @cantidad int
    set @counter = 0
    set @cantidad = (SELECT count(*)
    FROM OpenJson(@participantes))
    while (@counter < @cantidad)
				
                begin
        declare @json as nvarchar(max)
        set @json = (
						Select value
        From OpenJson(@participantes)
        where [key] = @counter
					)
        declare @counter2 int
        declare @cantidad2 int
        declare @query nvarchar(max)
        set @query = 'insert into participante values ('
        set @counter2 = 0
        set @cantidad2 = (SELECT count(*)
        FROM OpenJson(@json))
        while (@counter2 < @cantidad2)
						begin

            if @counter2 < 3
								set @query = @query+ '''' + (select [value]
            from OpenJson(@json)
            where [key] = @counter2) + ''','
							else
								set @query = @query + '''' + (select [value]
            from OpenJson(@json)
            where [key] = @counter2) + ''', 0)'
            set @counter2 = @counter2 + 1
        end
        print @query
        exec (@query)



        set @counter = @counter + 1
    end
end
go


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
go

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
go
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
go

CREATE PROCEDURE spBorrarParticipante
    @idParticipante INT
AS
BEGIN
    DELETE FROM participante
    WHERE idParticipante = @idParticipante;
END;
go


/*  */

CREATE PROCEDURE spInsertarParticipante
    @nombre VARCHAR(200),
    @email VARCHAR(200),
    @pass VARCHAR(60),
    @universidad INT
AS
BEGIN
    INSERT INTO participante
        (nombre, email, pass, universidad)
    VALUES
        (@nombre, @email, @pass, @universidad);
END;
go

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

GO
CREATE PROCEDURE spModificarContrasenaParticipante
    @correo VARCHAR(200),
    @nuevaContrasena VARCHAR(60)
AS
BEGIN
    UPDATE participante
    SET pass = @nuevaContrasena
    WHERE email = @correo;
END;
GO




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
go

CREATE PROCEDURE spGuardarRespuestaParticipante
    @numeroIntegral INT,
    @numeroRespuesta INT,
    @tiempoRespuestaSegundos INT,
    @idParticipante INT,
    @tiempoCompleto VARCHAR(max)
AS
BEGIN
    DECLARE @idRespuestaExistente INT;

    -- Verificar si el número de integral ya fue registrado por el participante
    SELECT @idRespuestaExistente = idRespuesta
    FROM respuestas
    WHERE numeroIntegral = @numeroIntegral
        AND participante = @idParticipante;

    IF @idRespuestaExistente IS NULL
    BEGIN
        -- Si no existe, insertar el registro
        INSERT INTO respuestas
            (numeroIntegral, numeroRespuesta, tiempoRespuestaSegundos, participante, tiempoCompleto)
        VALUES
            (@numeroIntegral, @numeroRespuesta, @tiempoRespuestaSegundos, @idParticipante, @tiempoCompleto);
    END
    ELSE
    BEGIN
        -- Si existe, actualizar el registro
        UPDATE respuestas
        SET numeroRespuesta = @numeroRespuesta,
            tiempoRespuestaSegundos = @tiempoRespuestaSegundos,
            tiempoCompleto = @tiempoCompleto
        WHERE idRespuesta = @idRespuestaExistente;
    END;
END;
go




CREATE PROCEDURE spGetTimerClasificaciones
    @id INT
AS
BEGIN
    SELECT minutos as minutos, segundos as segundos
    from encuentro
    where encuentro.idEncuentro = @id
END;

GO

CREATE PROCEDURE spObtenerRespuestasParticipante
    @idParticipante INT
AS
BEGIN
    SELECT tiempoRespuestaSegundos, numeroRespuesta, numeroIntegral
    FROM respuestas
    WHERE participante = @idParticipante;
END;

go

CREATE PROCEDURE spModificarPuntajeParticipante
    @idParticipante INT,
    @nuevoPuntaje FLOAT
AS
BEGIN
    UPDATE participante
    SET puntaje = @nuevoPuntaje
    WHERE idParticipante = @idParticipante;
END;
go


CREATE PROCEDURE spObtenerInfoParticipantes
AS
BEGIN
    SELECT
        p.nombre AS nombreParticipante,
        u.nombre AS nombreUniversidad,
        (
            SELECT
            r.numeroIntegral,
            r.numeroRespuesta,
            r.tiempoRespuestaSegundos,
            r.tiempoCompleto
        FROM respuestas r
        WHERE r.participante = p.idParticipante
        FOR JSON PATH
        ) AS respuestasJSON
    FROM
        participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    WHERE EXISTS (
        SELECT 1
    FROM respuestas r2
    WHERE r2.participante = p.idParticipante
    )
    ORDER BY p.puntaje DESC;;
END;


EXEC spObtenerInfoParticipantes;
GO

CREATE PROCEDURE spObtenerTopParticipantesPuntaje
AS
BEGIN
    -- Tabla temporal para los primeros 5 puestos
    CREATE TABLE #Primeros5
    (
        nombreParticipante VARCHAR(200),
        nombreUniversidad VARCHAR(200)
    );

    -- Tabla temporal para los siguientes 11 puestos
    CREATE TABLE #Siguientes11
    (
        nombreParticipante VARCHAR(200),
        nombreUniversidad VARCHAR(200)
    );

    -- Insertar los primeros 5 puestos
    INSERT INTO #Primeros5
        (nombreParticipante, nombreUniversidad)
    SELECT TOP 5
        p.nombre AS nombreParticipante, u.nombre AS nombreUniversidad
    FROM participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    ORDER BY p.puntaje DESC;

    -- Insertar los siguientes 11 puestos
    INSERT INTO #Siguientes11
        (nombreParticipante, nombreUniversidad)
    SELECT TOP 11
        p.nombre AS nombreParticipante, u.nombre AS nombreUniversidad
    FROM participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    WHERE p.idParticipante NOT IN (SELECT TOP 5
        idParticipante
    FROM participante
    ORDER BY puntaje DESC)
    ORDER BY p.puntaje DESC;

    -- Seleccionar los resultados de ambas tablas
    SELECT *
    FROM #Primeros5;
    SELECT *
    FROM #Siguientes11;

    -- Eliminar las tablas temporales
    DROP TABLE #Primeros5;
    DROP TABLE #Siguientes11;
END;