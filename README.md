# 🐾 NULLCATIA – Backend Sagrado del Reino Felino

NULLCATIA es un reino digital poblado por gatitos nulos que buscan propósito a través de la inicialización y conexión espiritual con su clan. Esta aplicación web es la respuesta del Consejo Felino a la crisis de la Transformación Felina 4.0. Usando Node.js, Express, EJS y MySQL, hemos construido un sistema modular que honra el arte del backend sagrado.

---

## 🧭 Historia del Proyecto

Cada gatito (cat) pertenece a un clan guardián (clan), que a su vez protege un territorio específico (territory). Los clanes heredan y transmiten conocimientos ancestrales a través de pergaminos (scrolls), que pueden ser compartidos entre diferentes clanes. NULLCATIA representa esta estructura mediante una arquitectura backend sólida, desacoplada y escalable.

---

## 🔧 Requisitos del sistema

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v16 o superior)
- MySQL Server
- Git (opcional, pero recomendado)
- Visual Studio Code o cualquier editor de texto

---

## ⚙️ Pasos de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TuUsuario/nullcatia.git
cd nullcatia
```


💡 Si no estás usando Git, descarga el .zip del proyecto y extrae su contenido.

### 2. Instalar las dependencias de Node.js

npm install

Esto instalará paquetes como:

express

ejs

mysql2

dotenv

method-override

express-validator

### 3. Configurar el entorno .env
Copia el archivo de ejemplo y edítalo con tus datos locales de MySQL:

cp .env.example .env

Edita el .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=nullcatia_db
DB_PORT=3306

### 4. Crear la base de datos
Desde tu cliente de MySQL o herramienta como Workbench:

**Crea la base de datos:**

CREATE DATABASE nullcatia_db;
Luego ejecuta el script schema.sql para crear todas las tablas:

USE nullcatia_db;
-- Copia y pega el contenido de schema.sql aquí

💡 Puedes usar también un archivo seed.sql opcional para insertar datos de ejemplo.

### 5. Iniciar el servidor de desarrollo

npm run dev

Esto ejecutará tu app con nodemon y la dejará corriendo en:

http://localhost:3000

**🗂️ Estructura del Proyecto**

nullcatia/
├── config/           # Configuración de conexión a MySQL
├── controllers/      # Lógica para manejar rutas
├── models/           # Operaciones de base de datos
├── routes/           # Enrutadores por recurso
├── views/
│   ├── partials/     # header.ejs, footer.ejs, nav.ejs
│   └── gatos/        # list.ejs, form.ejs
├── public/           # Archivos estáticos (CSS, imágenes)
├── .env.example
├── schema.sql
├── README.md
└── app.js

**✨ Funcionalidades clave**

Módulo	Funcionalidades
Gatitos	Crear, editar, eliminar y listar gatos
Clanes	Crear clanes, listarlos y asignar gatos
Territorios	Crear territorios asociados a clanes
Pergaminos	Asignar múltiples scrolls a un clan, listar sabiduría
Filtros	Buscar gatos por clan, edad o nombre

**🧪 Validaciones y Seguridad**

Inputs validados con express-validator

Uso de middleware de errores global

Sanitización de datos

.env protegido (no se sube a Git)

Estructura modular y desacoplada

###📜 Documentación de la API (Swagger)**


**⚠️ Si activas Swagger, asegúrate de instalar:**

npm install swagger-jsdoc swagger-ui-express

Luego accede a:
http://localhost:3000/api-docs

**📹 Video demostrativo**

**🎥 Ver demostración de NULLCATIA**
Incluye:

Intro narrativa

Crear un nuevo gato

Crear un nuevo clan y territorio

Asignación de clan

Consulta filtrada de gatos

**🔐 Buenas prácticas**

.env.example compartido, no credenciales reales

Uso de pool de conexiones MySQL

Separación de vistas con partials

Modularización de controladores y rutas

Compatible con estructura MVC

**👥 Autores**
