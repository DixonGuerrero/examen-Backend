-- 7.	Gestión de eventos en una plataforma de reservas: 
-- Marulanda Guerrero, Dixon Andres 
-- La base de datos contendría información sobre eventos, como 
-- ubicación, fecha y disponibilidad de entradas.
-- Los endpoints permitirían la gestión de eventos, incluida la 
-- creación, lectura, actualización y eliminación de eventos.


-- Creación de un tipo para el estado del evento
CREATE TYPE estado_evento AS ENUM ('Planificado', 'Activo', 'Completado', 'Cancelado');

-- Creación de la tabla Evento con el nuevo campo de estado
CREATE TABLE Evento (
    IdEvento SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Descripcion TEXT,
    FechaEvento DATE NOT NULL,
    Ubicacion VARCHAR(255) NOT NULL,
    Capacidad INT NOT NULL,
    EntradasDisponibles INT NOT NULL,
    EstadoEvento estado_evento NOT NULL DEFAULT 'Planificado'  
);

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    IdUsuario SERIAL PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL UNIQUE,
    Telefono VARCHAR(50)
);

-- Creación de la tabla Reserva
CREATE TABLE Reserva (
    IdReserva SERIAL PRIMARY KEY,
    IdEvento INT NOT NULL,
    IdUsuario INT NOT NULL,
    CantidadEntradas INT NOT NULL,
    FechaReserva DATE NOT NULL,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Trigger para actualizar las entradas disponibles en la tabla Evento
CREATE OR REPLACE FUNCTION actualizar_entradas_disponibles()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Evento
    SET EntradasDisponibles = EntradasDisponibles - NEW.CantidadEntradas
    WHERE IdEvento = NEW.IdEvento;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger que se dispara después de insertar una nueva reserva
CREATE TRIGGER trg_actualizar_entradas
AFTER INSERT ON Reserva
FOR EACH ROW
EXECUTE PROCEDURE actualizar_entradas_disponibles();

-- Insertar datos de ejemplo en la tabla Evento 
INSERT INTO Evento (Nombre, Descripcion, FechaEvento, Ubicacion, Capacidad, EntradasDisponibles, EstadoEvento)
VALUES 
('Concierto de Rock', 'Gran concierto de rock con bandas locales e internacionales', '2024-06-15', 'Estadio Central', 10000, 10000, 'Activo'),
('Festival de Jazz', 'Disfruta de lo mejor del jazz en este festival anual', '2024-09-20', 'Parque de la Música', 5000, 5000, 'Planificado');

-- Insertar datos de ejemplo en la tabla Usuario
INSERT INTO Usuario (Nombre, CorreoElectronico, Telefono)
VALUES 
('Dixon Marulanda', 'dixon@example.com', '3001234567'),
('Andres Guerrero', 'andres@example.com', '3007654321');

-- Insertar datos de ejemplo en la tabla Reserva
INSERT INTO Reserva (IdEvento, IdUsuario, CantidadEntradas, FechaReserva)
VALUES 
(1, 1, 2, '2024-06-14'),  -- Dixon reserva 2 entradas para el Concierto de Rock
(1, 2, 4, '2024-06-13'),  -- Andres reserva 4 entradas para el mismo concierto
(2, 1, 1, '2024-09-19');  -- Dixon reserva 1 entrada para el Festival de Jazz