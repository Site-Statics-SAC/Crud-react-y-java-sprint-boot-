-- Crear la base de datos
CREATE DATABASE gestion_estudiantes;
USE gestion_estudiantes;

-- Crear la tabla 'instituciones' con el nombre de columna corregido
CREATE TABLE instituciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    grado INT NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    turno VARCHAR(50) NOT NULL,
    nivel_academico VARCHAR(50) NOT NULL
);

-- Crear la tabla 'estudiantes' con la clave foránea 'institucion_id'
CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    sexo VARCHAR(10) NOT NULL,
    edad INT NOT NULL,
    celular INT NOT NULL,
    distrito VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    institucion_id INT,
    FOREIGN KEY (institucion_id) REFERENCES instituciones(id) ON DELETE CASCADE
);

-- Crear la tabla 'usuarios'
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Insertar datos de ejemplo en la tabla 'instituciones'
INSERT INTO instituciones (nombre, grado, seccion, turno, nivel_academico) VALUES
('Instituto Nacional', 5, 'A', 'Mañana', 'Secundaria'),
('Colegio Central', 3, 'B', 'Tarde', 'Primaria'),
('Escuela Técnica', 2, 'C', 'Mañana', 'Primaria');

-- Insertar datos de ejemplo en la tabla 'estudiantes'
INSERT INTO estudiantes (nombre, apellido, sexo, edad, celular, distrito, estado, institucion_id) VALUES
('Carlos', 'Perez', 'Masculino', 16, 987654321, 'Lima', 'Activo', 1),
('Ana', 'Lopez', 'Femenino', 10, 987654322, 'Arequipa', 'Activo', 2),
('Luis', 'Ramirez', 'Masculino', 15, 987654323, 'Cusco', 'Inactivo', 1),
('Marta', 'Sanchez', 'Femenino', 8, 987654324, 'Trujillo', 'Activo', 3);
