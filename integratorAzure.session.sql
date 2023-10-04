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

CREATE TABLE respuestAS
(
    idRespuesta INT IDENTITY(1, 1) PRIMARY KEY,
    numeroIntegral INT,
    numeroRespuesta INT,
    tiempoRespuestaSegundos INT,
    participante INT,
    FOREIGN KEY (participante) REFERENCES participante(idParticipante)
);

create table respuestasIntegrales
(
    nombreIntegral varchar(15),
    respuesta int
)
ALTER TABLE encuentro ADD minutos int, segundos int;
ALTER TABLE participante ADD puntaje int;
ALTER TABLE participante ALTER COLUMN pass varchar(200);
ALTER TABLE participante ALTER COLUMN puntaje float;
ALTER TABLE respuestAS ADD tiempoCompleto varchar(max)
insert into encuentro
values
    (0, 0, 4, 30);


CREATE PROCEDURE crearAdmin
    @nombre varchar(250),
    @pass varchar(200)
AS
insert into admin
values
    (@nombre, @pass);
GO
CREATE PROCEDURE loginAdmin
    @nombre varchar(250),
    @pass varchar(200)
AS
DECLARE @result int;
SET @result = (select idAdmin
FROM admin
WHERE nombre = @nombre AND contraseña = @pass);
select "resultado" = @result;
GO
select *
FROM admin;
exec crearAdmin "adminAmerica2", "25f9e794323b453885f5181f1b624d0b" 
GO
CREATE PROCEDURE sp_getUniversidades
AS
select
    universidad.*
FROM
    universidad;
        
GO
CREATE PROCEDURE sp_setParticipantes
    @nombre varchar(200),
    @email varchar(200),
    @pass varchar(60),
    @universidad int
AS
insert into participante
values
    (@nombre, @email, @pass, @universidad)
GO


CREATE PROCEDURE sp_setUniversidad
    @nombre varchar(200),
    @pais varchar(200),
    @sede varchar(200),
    @cantidad int,
    @correo varchar(200)
AS
insert into universidad
values
    (@nombre, @sede, @pais, @cantidad, @correo);
GO
CREATE PROCEDURE sp_setUniversidadList
    @universidades nvarchar(max)
AS
BEGIN
    DECLARE @counter int
    DECLARE @cantidad int
    SET @counter = 0
    SET @cantidad = (SELECT count(*)
    FROM OpenJson(@universidades))
    while (@counter < @cantidad)
                BEGIN
        DECLARE @json AS nvarchar(max)
        SET @json = (
						Select value
        FROM OpenJson(@universidades)
        WHERE [key] = @counter
					)
        DECLARE @counter2 int
        DECLARE @cantidad2 int
        DECLARE @query nvarchar(max)
        SET @query = 'insert into universidad values ('
        SET @counter2 = 0
        SET @cantidad2 = (SELECT count(*)
        FROM OpenJson(@json))
        while (@counter2 < @cantidad2)
						BEGIN
            if @counter2 < 4
								SET @query = @query+ '''' + (select [value]
            FROM OpenJson(@json)
            WHERE [key] = @counter2) + ''','
							else
								SET @query = @query + '''' + (select [value]
            FROM OpenJson(@json)
            WHERE [key] = @counter2) + ''')'
            SET @counter2 = @counter2 + 1
        END
        exec (@query)



        SET @counter = @counter + 1
    END
END
GO

CREATE PROCEDURE sp_getParticipantesByUniversidad
AS
DECLARE @cantUni AS int
DECLARE @count AS int
SET @cantUni = (select count(*)
FROM universidad)
SET @count = 0
while @count < @cantUni
			BEGIN
    select *
    FROM participante
    WHERE participante.universidad = (
					select uni.idUniversidad
    FROM (select ROW_NUMBER() OVER (Order by idUniversidad asc)  AS Row, universidad.idUniversidad
        FROM universidad ) uni
    WHERE Row = @count + 1
				);
    select uni.*
    FROM (select ROW_NUMBER() OVER (Order by idUniversidad asc)  AS Row, universidad.*
        FROM universidad ) uni
    WHERE Row = @count + 1
    SET @count = @count + 1
END

GO
CREATE PROCEDURE sp_setParticipanteList
    @participantes nvarchar(max)
AS
BEGIN
    DECLARE @counter int
    DECLARE @cantidad int
    SET @counter = 0
    SET @cantidad = (SELECT count(*)
    FROM OpenJson(@participantes))
    while (@counter < @cantidad)
				
                BEGIN
        DECLARE @json AS nvarchar(max)
        SET @json = (
						Select value
        FROM OpenJson(@participantes)
        WHERE [key] = @counter
					)
        DECLARE @counter2 int
        DECLARE @cantidad2 int
        DECLARE @query nvarchar(max)
        SET @query = 'insert into participante values ('
        SET @counter2 = 0
        SET @cantidad2 = (SELECT count(*)
        FROM OpenJson(@json))
        while (@counter2 < @cantidad2)
						BEGIN

            if @counter2 < 3
								SET @query = @query+ '''' + (select [value]
            FROM OpenJson(@json)
            WHERE [key] = @counter2) + ''','
							else
								SET @query = @query + '''' + (select [value]
            FROM OpenJson(@json)
            WHERE [key] = @counter2) + ''', 0)'
            SET @counter2 = @counter2 + 1
        END
        print @query
        exec (@query)



        SET @counter = @counter + 1
    END
END
GO


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
GO

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
GO
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
GO

ALTER PROCEDURE spBorrarParticipante
    @idParticipante INT
AS
BEGIN
    DELETE FROM respuestAS WHERE participante = @idParticipante;
    DELETE FROM participante
    WHERE idParticipante = @idParticipante;
END;
GO
select * FROM participante

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
GO

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
GO

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
    FROM respuestAS
    WHERE numeroIntegral = @numeroIntegral
        AND participante = @idParticipante;

    IF @idRespuestaExistente IS NULL
    BEGIN
        -- Si no existe, insertar el registro
        INSERT INTO respuestAS
            (numeroIntegral, numeroRespuesta, tiempoRespuestaSegundos, participante, tiempoCompleto)
        VALUES
            (@numeroIntegral, @numeroRespuesta, @tiempoRespuestaSegundos, @idParticipante, @tiempoCompleto);
    END
    ELSE
    BEGIN
        -- Si existe, actualizar el registro
        UPDATE respuestAS
        SET numeroRespuesta = @numeroRespuesta,
            tiempoRespuestaSegundos = @tiempoRespuestaSegundos,
            tiempoCompleto = @tiempoCompleto
        WHERE idRespuesta = @idRespuestaExistente;
    END;
END;
GO




CREATE PROCEDURE spGetTimerClasificaciones
    @id INT
AS
BEGIN
    SELECT minutos AS minutos, segundos AS segundos
    FROM encuentro
    WHERE encuentro.idEncuentro = @id
END;

GO

CREATE PROCEDURE spObtenerRespuestasParticipante
    @idParticipante INT
AS
BEGIN
    SELECT tiempoRespuestaSegundos, numeroRespuesta, numeroIntegral
    FROM respuestAS
    WHERE participante = @idParticipante;
END;

GO

CREATE PROCEDURE spModificarPuntajeParticipante
    @idParticipante INT,
    @nuevoPuntaje FLOAT
AS
BEGIN
    UPDATE participante
    SET puntaje = @nuevoPuntaje
    WHERE idParticipante = @idParticipante;
END;
GO


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
        FROM respuestAS r
        WHERE r.participante = p.idParticipante
        FOR JSON PATH
        ) AS respuestasJSON
    FROM
        participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    WHERE EXISTS (
        SELECT 1
    FROM respuestAS r2
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
        idParticipante int,
        nombreParticipante VARCHAR(200),
        nombreUniversidad VARCHAR(200)
    );

    -- Tabla temporal para los siguientes 11 puestos
    CREATE TABLE #Siguientes11
    (
        idParticipante int,
        nombreParticipante VARCHAR(200),
        nombreUniversidad VARCHAR(200)
    );

    -- Insertar los primeros 5 puestos
    INSERT INTO #Primeros5
        (idParticipante, nombreParticipante, nombreUniversidad)
    SELECT TOP 5
        p.idParticipante AS idParticipante, p.nombre AS nombreParticipante, u.nombre AS nombreUniversidad
    FROM participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    ORDER BY p.puntaje DESC;

    -- Insertar los siguientes 11 puestos
    INSERT INTO #Siguientes11
        (idParticipante, nombreParticipante, nombreUniversidad)
    SELECT TOP 11
        p.idParticipante AS idParticipante,p.nombre AS nombreParticipante, u.nombre AS nombreUniversidad
    FROM participante p
        INNER JOIN universidad u ON p.universidad = u.idUniversidad
    WHERE p.idParticipante NOT IN (SELECT TOP 5
        idParticipante
    FROM participante
    ORDER BY puntaje DESC)
    ORDER BY p.puntaje DESC;

    -- Seleccionar los resultados de ambAS tablAS
    SELECT *
    FROM #Primeros5;
    SELECT *
    FROM #Siguientes11;

    -- Eliminar lAS tablAS temporales
    DROP TABLE #Primeros5;
    DROP TABLE #Siguientes11;
END;

CREATE PROCEDURE guardarIntegral @nombreIntegral varchar(15), @respuesta int AS
BEGIN
    delete FROM respuestasIntegrales WHERE nombreIntegral = @nombreIntegral;
    insert into respuestasIntegrales values (@nombreIntegral, @respuesta)
END
CREATE PROCEDURE spGetRespuestAS AS
BEGIN
    select * FROM respuestasIntegrales
END
CREATE PROCEDURE spDropRespuestAS AS
BEGIN
    DELETE FROM respuestasIntegrales
END


--Nuevo

create table eliminatoriAS (
    idParticipante int, 
    encuentro int, 
    ronda int, 
    tiempo_1 varchar(MAX), 
    tiempo_2 varchar(MAX), 
    tiempo_3 varchar(MAX),
    texto_1 varchar(MAX),
    texto_2 varchar(MAX),
    texto_3 varchar(MAX))
Alter table eliminatorias ADD estado int;
Alter table eliminatorias ADD puntaje int;
CREATE PROCEDURE getTop16 AS
    BEGIN
        SELECT TOP 16 idParticipante FROM participante order by puntaje desc
    END

SELECT TOP 16 * FROM participante order by puntaje desc

update participante SET puntaje = 2 WHERE idParticipante = 125

ALTER procedure crearEncuentro @id_1 int, @id_2 int, @encuentro int, @ronda int, @estado INT AS
BEGIN
    insert into eliminatorias values (@id_1, @encuentro, @ronda, '', '', '', '', '', '', @estado, 0);
    insert into eliminatorias values (@id_2, @encuentro, @ronda, '', '', '', '', '', '', @estado, 0);
END;

select * FROM eliminatorias;

CREATE PROCEDURE spLlamarEncuentros AS
BEGIN
    SELECT e.*, p.nombre, u.nombre AS nombreU FROM eliminatoriAS e 
    LEFT JOIN participante p on e.idParticipante = p.idParticipante
    LEFT JOIN universidad u on u.idUniversidad = p.universidad;
END

CREATE PROCEDURE spGetEliminatoriaParticipante @idParticipante INT AS
    BEGIN
        SELECT * FROM eliminatorias WHERE idParticipante = @idParticipante AND estado = 1;
    END;

CREATE OR ALTER PROCEDURE spGetEliminatoriaActiva AS
    BEGIN
        SELECT * FROM eliminatorias e
        LEFT JOIN participante p ON p.idParticipante = e.idParticipante
        WHERE e.estado = 1
        ORDER BY p.puntaje DESC;
    END;

CREATE PROCEDURE spGetPosicionParticipante @idParticipante INT AS
    BEGIN
        select puntaje from participante p where p.puntaje > (select puntaje from participante where idParticipante = @idParticipante) ORDER BY p.puntaje DESC;
    END
select * from eliminatorias
update eliminatorias set puntaje = 0
delete from integral

select * from participante  ORDER BY puntaje DESC;
delete from eliminatorias
update universidad set puntaje = 0;
update participante set puntaje = 0;

exec spGetEliminatoriaParticipante 18
