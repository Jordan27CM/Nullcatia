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
- Git
- Visual Studio Code

---

## ⚙️ Pasos de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Jordan27CM/Nullcatia.git
cd Nullcatia
```
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
usa el scrip que se encuentra en schema.sql para crear la base de datos y usa los registros de seeds.sql para agregar a las tablas como datos de ejemplo

### 5. Iniciar el servidor de desarrollo

npm run dev

**🗂️ Estructura del Proyecto**

![image](https://github.com/user-attachments/assets/5724ea8e-fbd5-447d-a3fc-7200b0e11732)


**✨ Funcionalidades clave**

Módulo	Funcionalidades
Gatitos	Crear, editar, eliminar y listar gatos
Clanes	Crear clanes, editar, eliminar y listarlos
Territorios	Crear territorios, editar territorios y listar los territorios
Pergaminos	Asignar múltiples pergaminos a un clan y listar los pergaminos
Filtros	Buscar gatos por clan o nombre

**🧪 Validaciones y Seguridad**

Inputs validados con express-validator

Uso de middleware de errores global

.env protegido (no se sube a Git)

Estructura modular y desacoplada

###📜 Documentación de la API (Swagger)**

toda la documentacion de las rutas se encuentra en este link
http://localhost:3000/api-docs

**📹 Video demostrativo**

https://youtu.be/ANhEpP4Cl6k

**🔐 Buenas prácticas**

.env.example compartido, no credenciales reales

Uso de pool de conexiones MySQL

Separación de vistas con partials

Modularización de controladores y rutas

Compatible con estructura MVC

**👥 Autores**

Jordan Murillo

Anibal Tapia

Adrian Ramirez
