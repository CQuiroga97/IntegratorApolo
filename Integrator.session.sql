USE [master]
GO
/****** Object:  Database [integrator]    Script Date: 5/10/2023 3:32:48 p. m. ******/
CREATE DATABASE [integrator]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'integrator', FILENAME = N'D:\Program Files\Microsoft Sql Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\integrator.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'integrator_log', FILENAME = N'D:\Program Files\Microsoft Sql Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\integrator_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [integrator] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [integrator].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [integrator] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [integrator] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [integrator] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [integrator] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [integrator] SET ARITHABORT OFF 
GO
ALTER DATABASE [integrator] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [integrator] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [integrator] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [integrator] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [integrator] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [integrator] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [integrator] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [integrator] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [integrator] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [integrator] SET  DISABLE_BROKER 
GO
ALTER DATABASE [integrator] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [integrator] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [integrator] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [integrator] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [integrator] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [integrator] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [integrator] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [integrator] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [integrator] SET  MULTI_USER 
GO
ALTER DATABASE [integrator] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [integrator] SET DB_CHAINING OFF 
GO
ALTER DATABASE [integrator] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [integrator] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [integrator] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [integrator] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [integrator] SET QUERY_STORE = OFF
GO
USE [integrator]
GO
/****** Object:  Table [dbo].[admin]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin](
	[idAdmin] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](250) NULL,
	[contraseña] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[idAdmin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contacto]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contacto](
	[nombre] [varchar](200) NULL,
	[descripcion] [varchar](500) NULL,
	[correo] [varchar](300) NULL,
	[hora] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[eliminatorias]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[eliminatorias](
	[idParticipante] [int] NULL,
	[encuentro] [int] NULL,
	[ronda] [int] NULL,
	[tiempo_1] [varchar](max) NULL,
	[tiempo_2] [varchar](max) NULL,
	[tiempo_3] [varchar](max) NULL,
	[texto_1] [varchar](max) NULL,
	[texto_2] [varchar](max) NULL,
	[texto_3] [varchar](max) NULL,
	[estado] [int] NULL,
	[puntaje] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[encuentro]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[encuentro](
	[idEncuentro] [int] IDENTITY(1,1) NOT NULL,
	[estado] [int] NULL,
	[ronda] [int] NULL,
	[minutos] [int] NULL,
	[segundos] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idEncuentro] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[encuentroParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[encuentroParticipante](
	[participante] [int] NULL,
	[encuentro] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[integral]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[integral](
	[idIntegral] [int] IDENTITY(1,1) NOT NULL,
	[estado] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idIntegral] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[jurado]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[jurado](
	[idJurado] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](250) NULL,
	[contraseña] [varchar](200) NULL,
	[correo] [varchar](300) NULL,
PRIMARY KEY CLUSTERED 
(
	[idJurado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[participante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[participante](
	[idParticipante] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](200) NULL,
	[email] [varchar](200) NULL,
	[pass] [varchar](200) NULL,
	[universidad] [int] NULL,
	[puntaje] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[idParticipante] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pregunta]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pregunta](
	[idPregunta] [int] NOT NULL,
	[urlImagen] [varchar](120) NULL,
	[correcta] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idPregunta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[puntoRonda]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[puntoRonda](
	[hora] [date] NULL,
	[participante] [int] NULL,
	[encuentro] [int] NULL,
	[integral] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestas]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestas](
	[idRespuesta] [int] IDENTITY(1,1) NOT NULL,
	[numeroIntegral] [int] NULL,
	[numeroRespuesta] [int] NULL,
	[tiempoRespuestaSegundos] [int] NULL,
	[participante] [int] NULL,
	[tiempoCompleto] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[idRespuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestasIntegrales]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestasIntegrales](
	[nombreIntegral] [varchar](15) NULL,
	[respuesta] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[seriales]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[seriales](
	[serial] [varchar](25) NOT NULL,
	[estado] [int] NULL,
	[universidad] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[serial] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[universidad]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[universidad](
	[idUniversidad] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](200) NULL,
	[sede] [varchar](200) NULL,
	[pais] [varchar](200) NULL,
	[cantParticipantes] [int] NULL,
	[correo] [varchar](200) NULL,
	[puntaje] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[idUniversidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[encuentroParticipante]  WITH CHECK ADD FOREIGN KEY([encuentro])
REFERENCES [dbo].[encuentro] ([idEncuentro])
GO
ALTER TABLE [dbo].[encuentroParticipante]  WITH CHECK ADD FOREIGN KEY([participante])
REFERENCES [dbo].[participante] ([idParticipante])
GO
ALTER TABLE [dbo].[participante]  WITH CHECK ADD FOREIGN KEY([universidad])
REFERENCES [dbo].[universidad] ([idUniversidad])
GO
ALTER TABLE [dbo].[puntoRonda]  WITH CHECK ADD FOREIGN KEY([encuentro])
REFERENCES [dbo].[encuentro] ([idEncuentro])
GO
ALTER TABLE [dbo].[puntoRonda]  WITH CHECK ADD FOREIGN KEY([integral])
REFERENCES [dbo].[integral] ([idIntegral])
GO
ALTER TABLE [dbo].[puntoRonda]  WITH CHECK ADD FOREIGN KEY([participante])
REFERENCES [dbo].[participante] ([idParticipante])
GO
ALTER TABLE [dbo].[respuestas]  WITH CHECK ADD FOREIGN KEY([participante])
REFERENCES [dbo].[participante] ([idParticipante])
GO
ALTER TABLE [dbo].[seriales]  WITH CHECK ADD FOREIGN KEY([universidad])
REFERENCES [dbo].[universidad] ([idUniversidad])
GO
/****** Object:  StoredProcedure [dbo].[crearAdmin]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[crearAdmin]
    @nombre varchar(250),
    @pass varchar(200)
AS
	INSERT INTO admin
	VALUES
		(@nombre, @pass);
GO
/****** Object:  StoredProcedure [dbo].[crearEncuentro]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[crearEncuentro] @id_1 int, @id_2 int, @encuentro int, @ronda int, @estado INT AS
BEGIN
    insert into eliminatorias values (@id_1, @encuentro, @ronda, '', '', '', '', '', '', @estado, 0);
    insert into eliminatorias values (@id_2, @encuentro, @ronda, '', '', '', '', '', '', @estado, 0);
END;
GO
/****** Object:  StoredProcedure [dbo].[getTop16]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[getTop16] AS
    BEGIN
        SELECT TOP 16 idParticipante FROM participante order by puntaje desc
    END
GO
/****** Object:  StoredProcedure [dbo].[getTopUniversidades]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getTopUniversidades] AS
BEGIN
    SELECT * FROM universidad ORDER BY puntaje DESC
END
GO
/****** Object:  StoredProcedure [dbo].[guardarIntegral]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[guardarIntegral] @nombreIntegral varchar(15), @respuesta int AS
BEGIN
    delete FROM respuestasIntegrales WHERE nombreIntegral = @nombreIntegral;
    insert into respuestasIntegrales values (@nombreIntegral, @respuesta)
END
GO
/****** Object:  StoredProcedure [dbo].[loginAdmin]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[loginAdmin]
    @nombre varchar(250),
    @pass varchar(200)
AS
	DECLARE @result int;
	SET @result = (select idAdmin
	FROM admin
	WHERE nombre = @nombre AND contraseña = @pass);
	SELECT "resultado" = @result;
GO
/****** Object:  StoredProcedure [dbo].[loginParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[loginParticipante]
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
/****** Object:  StoredProcedure [dbo].[sp_getParticipantesByUniversidad]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[sp_getParticipantesByUniversidad]
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
/****** Object:  StoredProcedure [dbo].[sp_getUniversidades]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[sp_getUniversidades]
AS
	SELECT
		universidad.*
	FROM
		universidad;
GO
/****** Object:  StoredProcedure [dbo].[sp_setParticipanteList]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[sp_setParticipanteList]
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
/****** Object:  StoredProcedure [dbo].[sp_setParticipantes]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[sp_setParticipantes]
    @nombre varchar(200),
    @email varchar(200),
    @pass varchar(200),
    @universidad int
AS
	INSERT INTO participante
	VALUES
		(@nombre, @email, @pass, @universidad, 0)
GO
/****** Object:  StoredProcedure [dbo].[sp_setUniversidad]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_setUniversidad]
    @nombre varchar(200),
    @pais varchar(200),
    @sede varchar(200),
    @cantidad int,
    @correo varchar(200)
AS
	INSERT INTO universidad
	VALUES
		(@nombre, @sede, @pais, @cantidad, @correo, 0);

GO
/****** Object:  StoredProcedure [dbo].[sp_setUniversidadList]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[sp_setUniversidadList]
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
/****** Object:  StoredProcedure [dbo].[spBorrarIntegral]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[spBorrarIntegral] @id int AS
BEGIN
    DELETE FROM integral where idIntegral = @id
END
GO
/****** Object:  StoredProcedure [dbo].[spBorrarParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spBorrarParticipante]
    @idParticipante INT
AS
BEGIN
    DELETE FROM respuestas WHERE participante = @idParticipante;
    DELETE FROM participante
    WHERE idParticipante = @idParticipante;
END;
GO
/****** Object:  StoredProcedure [dbo].[spBorrarUniversidadesEstudiantes]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spBorrarUniversidadesEstudiantes]
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
/****** Object:  StoredProcedure [dbo].[spDropRespuestas]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spDropRespuestas] AS
BEGIN
    DELETE FROM respuestasIntegrales
END
GO
/****** Object:  StoredProcedure [dbo].[spGetEliminatoriaActiva]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[spGetEliminatoriaActiva] AS
    BEGIN
        SELECT * FROM eliminatorias e
        LEFT JOIN participante p ON p.idParticipante = e.idParticipante
        WHERE e.estado = 1
        ORDER BY p.puntaje DESC;
    END;
GO
/****** Object:  StoredProcedure [dbo].[spGetEliminatoriaParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetEliminatoriaParticipante] @idParticipante INT AS
    BEGIN
        SELECT * FROM eliminatorias WHERE idParticipante = @idParticipante AND estado = 1;
    END;
GO
/****** Object:  StoredProcedure [dbo].[spGetIntegralesAdmin]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetIntegralesAdmin] AS
BEGIN
    SELECT TOP 1
        * FROM integral WHERE estado = 0 ORDER BY idIntegral DESC
    SELECT TOP 1
        * FROM integral WHERE estado = 1 ORDER BY idIntegral DESC
END
GO
/****** Object:  StoredProcedure [dbo].[spGetPosicionParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetPosicionParticipante] @idParticipante INT AS
    BEGIN
        select puntaje from participante p where p.puntaje > (select puntaje from participante where idParticipante = @idParticipante) ORDER BY p.puntaje DESC;
    END
GO
/****** Object:  StoredProcedure [dbo].[spGetRespuestas]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spGetRespuestas] AS
BEGIN
    select * FROM respuestasIntegrales
END
GO
/****** Object:  StoredProcedure [dbo].[spGetTimerClasificaciones]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spGetTimerClasificaciones]
    @id INT
AS
BEGIN
    SELECT minutos AS minutos, segundos AS segundos
    FROM encuentro
    WHERE encuentro.idEncuentro = @id
END;

GO
/****** Object:  StoredProcedure [dbo].[spGetUniversidadesParticipantes]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spGetUniversidadesParticipantes]
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
/****** Object:  StoredProcedure [dbo].[spGuardarIntegral]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spGuardarIntegral] AS
BEGIN
    INSERT INTO integral VALUES (0);
    SELECT SCOPE_IDENTITY() 'id'
END
GO
/****** Object:  StoredProcedure [dbo].[spGuardarRespuestaParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGuardarRespuestaParticipante]
    @numeroIntegral INT,
    @numeroRespuesta INT,
    @tiempoRespuestaSegundos INT,
    @idParticipante INT,
    @tiempoCompleto VARCHAR(max),
    @puntaje FLOAT,
    @puntajeU INT
AS
BEGIN
    UPDATE participante
    SET puntaje = puntaje + @puntaje
    WHERE idParticipante = @idParticipante;

    DECLARE @cantUniversidad INT;
    DECLARE @idUniversidad INT;
    SELECT @idUniversidad = universidad FROM participante WHERE idParticipante = @idParticipante;

    SELECT @cantUniversidad = COUNT(*) FROM participante WHERE universidad = @idUniversidad;
    SELECT COUNT(*) FROM participante WHERE universidad = @idUniversidad;

    DECLARE @puntajeTotal FLOAT
    SET @puntajeTotal = (CAST(@puntajeU AS FLOAT)/CAST(@cantUniversidad AS FLOAT))

    UPDATE universidad SET puntaje = puntaje + @puntajeTotal WHERE idUniversidad = @idUniversidad;

    DECLARE @idRespuestaExistente INT;

    -- Verificar si el n�mero de integral ya fue registrado por el participante
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
GO
/****** Object:  StoredProcedure [dbo].[spInsertarParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spInsertarParticipante]
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
/****** Object:  StoredProcedure [dbo].[spLlamarEncuentros]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[spLlamarEncuentros] AS
BEGIN
    SELECT e.*, p.nombre, u.nombre AS nombreU FROM eliminatoriAS e 
    LEFT JOIN participante p on e.idParticipante = p.idParticipante
    LEFT JOIN universidad u on u.idUniversidad = p.universidad
    ORDER BY e.ronda DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[spLlamarIntegrales]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spLlamarIntegrales] AS
BEGIN
    SELECT * from integral ORDER BY idIntegral DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[spModificarContrasenaParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spModificarContrasenaParticipante]
    @correo VARCHAR(200),
    @nuevaContrasena VARCHAR(60)
AS
BEGIN
    UPDATE participante
    SET pass = @nuevaContrasena
    WHERE email = @correo;
END;
GO
/****** Object:  StoredProcedure [dbo].[spModificarIntegral]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spModificarIntegral] @integral int, @estado int AS
BEGIN
    UPDATE integral SET estado = @estado where idIntegral = @integral
END
GO
/****** Object:  StoredProcedure [dbo].[spModificarParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spModificarParticipante]
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
/****** Object:  StoredProcedure [dbo].[spModificarPuntajeParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spModificarPuntajeParticipante]
    @idParticipante INT,
    @nuevoPuntaje FLOAT
AS
BEGIN
    UPDATE participante
    SET puntaje = @nuevoPuntaje
    WHERE idParticipante = @idParticipante;
END;
GO
/****** Object:  StoredProcedure [dbo].[spModificarUniversidad]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spModificarUniversidad]
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
/****** Object:  StoredProcedure [dbo].[spObtenerInfoParticipantes]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spObtenerInfoParticipantes]
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
GO
/****** Object:  StoredProcedure [dbo].[spObtenerRespuestasParticipante]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spObtenerRespuestasParticipante]
    @idParticipante INT
AS
BEGIN
    SELECT tiempoRespuestaSegundos, numeroRespuesta, numeroIntegral
    FROM respuestas
    WHERE participante = @idParticipante;
END;

GO
/****** Object:  StoredProcedure [dbo].[spObtenerTopParticipantesPuntaje]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-----------------------------------------

CREATE PROCEDURE [dbo].[spObtenerTopParticipantesPuntaje]
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

    -- Seleccionar los resultados de ambas tablas
    SELECT *
    FROM #Primeros5;
    SELECT *
    FROM #Siguientes11;

    -- Eliminar las tablas temporales
    DROP TABLE #Primeros5;
    DROP TABLE #Siguientes11;
END;
GO
/****** Object:  StoredProcedure [dbo].[spUpdateEncuentro]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[spUpdateEncuentro]
    @encuentro INT, 
    @ronda INT, 
    @idGanador INT,
    @idPerdedor INT,
    @nuevaRonda INT,
    @nuevoEncuentro INT,
    @encuentroPasar INT,
    @rondaPasar INT,
    @tercerPuesto INT
    AS
    BEGIN
        IF (@tercerPuesto = 1)
            BEGIN
                INSERT INTO eliminatorias values(@idPerdedor,1, 0, '', '', '', '', '', '', 0, 0);
            END
        IF (@tercerPuesto != 2)
            BEGIN

                INSERT INTO eliminatorias values(@idGanador,@encuentroPasar, @rondaPasar, '', '', '', '', '', '', 0, 0);
            END
        UPDATE eliminatorias SET 
            estado = 2
            WHERE idParticipante = @idGanador AND encuentro = @encuentro AND ronda = @ronda;
        UPDATE eliminatorias SET 
            estado = 3
            WHERE idParticipante = @idPerdedor AND encuentro = @encuentro AND ronda = @ronda;
        UPDATE eliminatorias SET 
            estado = 1
            WHERE encuentro = @nuevoEncuentro AND ronda = @nuevaRonda;
    END;
GO
/****** Object:  StoredProcedure [dbo].[spUpdatePuntaje]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[spUpdatePuntaje] @idParticipante INT, @encuentro INT, @ronda INT, @puntaje INT AS
    BEGIN
        DECLARE @puntajeAdd INT;
        SELECT @puntajeAdd = puntaje FROM eliminatorias WHERE idParticipante = @idParticipante AND encuentro = @encuentro AND ronda = @ronda;
        UPDATE eliminatorias SET puntaje = @puntaje + @puntajeAdd WHERE idParticipante = @idParticipante AND encuentro = @encuentro AND ronda = @ronda;
        PRINT @puntajeAdd
    END;
GO
/****** Object:  StoredProcedure [dbo].[spUpdateTexto]    Script Date: 5/10/2023 3:32:48 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[spUpdateTexto]
    @idParticipante INT, 
    @encuentro INT, 
    @ronda INT, 
    @texto_1 VARCHAR(MAX), 
    @texto_2 VARCHAR(MAX), 
    @texto_3 VARCHAR(MAX), 
    @tiempo_1 VARCHAR(MAX), 
    @tiempo_2 VARCHAR(MAX), 
    @tiempo_3 VARCHAR(MAX)
    AS
    BEGIN
        DECLARE @puntajeAdd INT;
        UPDATE eliminatorias SET 
            texto_1 = @texto_1,
            texto_2 = @texto_2,
            texto_3 = @texto_3,
            tiempo_1 = @tiempo_1,
            tiempo_2 = @tiempo_2,
            tiempo_3 = @tiempo_3
            
            WHERE idParticipante = @idParticipante AND encuentro = @encuentro AND ronda = @ronda;
    END;
GO
USE [master]
GO
ALTER DATABASE [integrator] SET  READ_WRITE 
GO
SELECT * FROM participante

exec crearAdmin "adminAmerica2", "25f9e794323b453885f5181f1b624d0b" 

SELECT * FROM respuestasIntegrales
UPDATE participante SET pass = '25f9e794323b453885f5181f1b624d0b';

DELETE FROM eliminatorias
insert into encuentro values (0, 0, 5, 0)
SELECT * FROM 
    -- respuestas;
    eliminatorias