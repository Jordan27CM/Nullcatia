require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const routes = require('./routes');

const errorHandler = require('./middlewares/errorHandler');
const { swaggerUi, specs } = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler);
app.use(routes);

app.get('/', (req, res) => {
  res.render('index');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
