require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');

const catsRoutes = require('./routes/cats');
const clansRoutes = require('./routes/clans');
const pergaminosRoutes = require('./routes/pergaminos');
const territoriosRoutes = require('./routes/territorios');
const clanPergamino = require('./routes/clanPergamino');

const errorHandler = require('./middlewares/errorHandler');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);

app.use('/clanPergamino', clanPergamino);
app.use('/territorios', territoriosRoutes);
app.use('/pergaminos', pergaminosRoutes);

app.use('/gatos', catsRoutes);
app.use('/clanes', clansRoutes);
// Rutas base
// Ahora:
app.get('/', (req, res) => {
  res.render('index');
});


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
