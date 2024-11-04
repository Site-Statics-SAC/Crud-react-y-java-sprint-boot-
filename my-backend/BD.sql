-- Crear la base de datos
CREATE DATABASE  basededatos;
USE basededatos;

-- Crear la tabla instituciones (INT para la clave primaria)
CREATE TABLE instituciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    grado INT NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    turno VARCHAR(10) NOT NULL, -- Mañana, tarde, noche
    nivel_academico VARCHAR(100) NOT NULL, -- Nivel académico (Primaria, Secundaria)
    celular VARCHAR(15) -- Número de contacto
);

-- Insertar datos de ejemplo en la tabla instituciones
INSERT INTO instituciones (nombre, grado, seccion, turno, nivel_academico, celular) VALUES
('Instituto ABC', 10, 'A', 'Mañana', 'Secundaria', '123456789'),
('Colegio XYZ', 5, 'B', 'Tarde', 'Primaria', '987654321'),
('Escuela DEF', 8, 'C', 'Noche', 'Secundaria', '1122334455');

-- Crear la tabla estudiantes (INT para la clave foránea)
CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    edad INT NOT NULL,
    celular VARCHAR(15), -- Manejo correcto de números de teléfono
    distrito VARCHAR(100) NOT NULL,
    institucion_id INT NOT NULL, -- Clave foránea debe ser INT
    FOREIGN KEY (institucion_id) REFERENCES instituciones(id) -- Clave foránea
);

-- Insertar datos de ejemplo en la tabla estudiantes, con referencia a instituciones
INSERT INTO estudiantes (nombre, apellido, sexo, edad, celular, distrito, institucion_id) VALUES
('Pepe', 'Grillo', 'Masculino', 21, '105', 'Iquitos', 1),
('Juan', 'Pérez', 'Masculino', 22, '204', 'Lima', 2),
('María', 'Gómez', 'Femenino', 20, '305', 'Arequipa', 3);

-- Consultar todos los estudiantes con su institución asociada
SELECT e.id, e.nombre, e.apellido, e.sexo, e.edad, e.celular, e.distrito, i.nombre AS institucion
FROM estudiantes e
JOIN instituciones i ON e.institucion_id = i.id;

-- Consultar todos los estudiantes
SELECT * FROM estudiantes;

-- Forzar el tipo de columna INT para la clave foránea (si es necesario)
ALTER TABLE estudiantes MODIFY COLUMN institucion_id INT NOT NULL;
