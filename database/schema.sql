CREATE DATABASE nullcatia;
USE nullcatia;

-- tabla de territorios
CREATE TABLE territorios (
    territorio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    INDEX idx_nombre_territorio (nombre)
);
-- tabla de clanes
CREATE TABLE clanes (
    clan_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    territorio_id INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (territorio_id) REFERENCES territorios(territorio_id) ON DELETE RESTRICT,
    INDEX idx_nombre_clan (nombre),
    INDEX idx_clan_territorio (territorio_id)
);

-- tabla de gatos
CREATE TABLE gatos (
    gato_id INT AUTO_INCREMENT PRIMARY KEY,
    raza VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    clan_id INT NOT NULL,
    fecha_nacimiento DATE,
    FOREIGN KEY (clan_id) REFERENCES clanes(clan_id) ON DELETE RESTRICT,
    INDEX idx_nombre_gato (nombre),
    INDEX idx_gato_clan (clan_id)
);
-- tabla de pergaminos
CREATE TABLE pergaminos (
    pergamino_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL
);

-- Tabla relación clan-pergamino
CREATE TABLE clan_pergamino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clan_id INT NOT NULL,
    pergamino_id INT NOT NULL,
    agregado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clan_id) REFERENCES clanes(clan_id) ON DELETE CASCADE,
    FOREIGN KEY (pergamino_id) REFERENCES pergaminos(pergamino_id) ON DELETE CASCADE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'usuario') NOT NULL DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

