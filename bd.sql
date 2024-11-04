CREATE DATABASE MICROSYSTEMSBD;
USE MICROSYSTEMSBD;

-- 1. Crear la tabla ESTUDIANTES
CREATE TABLE ESTUDIANTES (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    nombre VARCHAR(100), -- Nombre del estudiante
    apellido VARCHAR(100), -- Apellido del estudiante
    edad INT, -- Edad del estudiante
    sexo VARCHAR(13), -- Sexo del estudiante
    distrito VARCHAR(50), -- Distrito del estudiante
    celular VARCHAR(15) -- Celular del estudiante
);

-- 2. Insertar datos en la tabla ESTUDIANTES
INSERT INTO ESTUDIANTES (nombre, apellido, edad, sexo, distrito, celular)
VALUES ('pepe', 'grillo', 20, 'masculino', 'iquitos', '987654321');

INSERT INTO ESTUDIANTES (nombre, apellido, edad, sexo, distrito, celular)
VALUES ('Juan', 'Pérez', 18, 'masculino', 'Lima', '987654321');

-- 3. Crear la tabla USUARIOS
CREATE TABLE USUARIOS (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    nombre VARCHAR(100), -- Nombre del usuario
    apellido VARCHAR(100), -- Apellido del usuario
    email VARCHAR(100) UNIQUE, -- Email del usuario
    password VARCHAR(255), -- Contraseña del usuario (se recomienda almacenar un hash)
    role VARCHAR(50) -- Rol del usuario (ej: admin, user, etc.)
);

-- 5. Crear la tabla INSTITUCIONES, con una clave foránea que referencia a ESTUDIANTES
CREATE TABLE INSTITUCIONES (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    nombre VARCHAR(100), -- Nombre de la institución
    grado INT, -- Grado de los estudiantes en la institución
    seccion VARCHAR(2), -- Sección del estudiante
    turno VARCHAR(20), -- Turno (mañana, tarde, etc.)
    nivelAcademico VARCHAR(20), -- Nivel académico (primaria, secundaria, etc.)
    estudiante_id INT, -- Clave foránea que referencia a la tabla ESTUDIANTES
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTES(id) -- Establece la relación con ESTUDIANTES
);

-- 6. Insertar datos en la tabla INSTITUCIONES, asociando a un estudiante existente
INSERT INTO INSTITUCIONES (nombre, grado, seccion, turno, nivelAcademico, estudiante_id)
VALUES ('augusto freyre', 3, 'H', 'mañana', 'primaria', 1);

-- 7. Crear la tabla LLAMADAS, con claves foráneas que referencian a ESTUDIANTES e INSTITUCIONES
CREATE TABLE LLAMADAS (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    estudiante_id INT, -- Clave foránea que referencia a la tabla ESTUDIANTES
    institucion_id INT, -- Clave foránea que referencia a la tabla INSTITUCIONES
    estado VARCHAR(20), -- Estado de la llamada (ej: pendiente, realizada)
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTES(id), -- Relación con ESTUDIANTES
    FOREIGN KEY (institucion_id) REFERENCES INSTITUCIONES(id) -- Relación con INSTITUCIONES
);

-- 8. Insertar datos en la tabla LLAMADAS, asociando un estudiante y una institución
INSERT INTO LLAMADAS (estudiante_id, institucion_id, estado)
VALUES (1, 1, 'pendiente');

-- 9. Crear la tabla MATRICULADOS, con claves foráneas que referencian a ESTUDIANTES, INSTITUCIONES y USUARIOS
CREATE TABLE MATRICULADOS (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Clave primaria autoincremental
    estudiante_id INT, -- Clave foránea que referencia a la tabla ESTUDIANTES
    institucion_id INT, -- Clave foránea que referencia a la tabla INSTITUCIONES
    usuario_id INT, -- Clave foránea que referencia a la tabla USUARIOS
    fecha_matricula DATE, -- Fecha de matriculación del estudiante
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTES(id), -- Relación con ESTUDIANTES
    FOREIGN KEY (institucion_id) REFERENCES INSTITUCIONES(id), -- Relación con INSTITUCIONES
    FOREIGN KEY (usuario_id) REFERENCES USUARIOS(id) -- Relación con USUARIOS
);
