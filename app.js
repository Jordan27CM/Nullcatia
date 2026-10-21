require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { setUserLocals } = require('./middlewares/authMiddleware');
const { swaggerUi, specs } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'nullcatia_secret_key_reino_gatos',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));

// Pasar variables de sesión a res.locals para EJS
app.use(setUserLocals);

app.get('/', (req, res) => {
  res.render('index');
});

// Rutas de la aplicación
app.use(routes);

// Manejo centralizado de errores (debe ser el último middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
