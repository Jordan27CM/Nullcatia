const catModel = require('../models/catModel');
const clanModel = require('../models/clanModel');
const puppeteer = require('puppeteer');

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 'Edad desconocida';

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  // Diferencia en milisegundos
  const differencia = hoy - nacimiento;

  // Convertir a años
  const edadAnios = Math.floor(differencia / (1000 * 60 * 60 * 24 * 365.25));

  // Convertir a meses si es menor de 1 año
  if (edadAnios < 1) {
    const edadMeses = Math.floor(differencia / (1000 * 60 * 60 * 24 * 30));
    return `${edadMeses} ${edadMeses === 1 ? 'mes' : 'meses'}`;
  }

  return `${edadAnios} ${edadAnios === 1 ? 'año' : 'años'}`;
}

module.exports = {
  listar: async (req, res, next) => {
    try {
      const { nombre, clan_id } = req.query;

      const gatos = await catModel.filtro(nombre, clan_id);

      // Calcular edad y formatear fecha
      const gatosConEdad = gatos.map(gato => ({
        ...gato,
        edad: calcularEdad(gato.fecha_nacimiento),
        fechaFormateada: gato.fecha_nacimiento
          ? new Date(gato.fecha_nacimiento).toLocaleDateString('es-ES')
          : 'Desconocida'
      }));

      const clanes = await clanModel.buscarTodo();

      res.render('gatos/listar', {
        gatos: gatosConEdad,
        clanes,
        filtroNombre: nombre,
        filtroClan: clan_id
      });
    } catch (err) {
      next(err);
    }
  },

  verFormulario: async (req, res, next) => {
    try {
      const clanes = await clanModel.buscarTodo();
      res.render('gatos/nuevo', { clanes });
    } catch (err) {
      next(err);
    }
  },

  crear: async (req, res, next) => {
    try {
      if (!req.body.nombre || !req.body.raza || !req.body.fecha_nacimiento || !req.body.clan_id) {
        throw new Error('Todos los campos son requeridos');
      }

      const fechaNacimiento = new Date(req.body.fecha_nacimiento);
      if (fechaNacimiento > new Date()) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }

      const gatoData = {
        nombre: req.body.nombre,
        raza: req.body.raza,
        fecha_nacimiento: req.body.fecha_nacimiento,
        clan_id: req.body.clan_id
      };

      await catModel.crear(gatoData);

      res.redirect('/gatos');
    } catch (err) {
      try {
        const clanes = await clanModel.buscarTodo();
        res.render('gatos/nuevo', {
          clanes,
          error: err.message,
          formData: req.body
        });
      } catch (error) {
        next(error);
      }
    }
  },

  formularioEditar: async (req, res, next) => {
    try {
      const gato = await catModel.buscarId(req.params.id);
      const clanes = await clanModel.buscarTodo();

      const gatoConEdad = {
        ...gato,
        fechaFormateada: gato.fecha_nacimiento
          ? new Date(gato.fecha_nacimiento).toISOString().split('T')[0]
          : ''
      };

      res.render('gatos/editar', { gato: gatoConEdad, clanes });
    } catch (err) {
      next(err);
    }
  },

  actualizar: async (req, res, next) => {
    try {
      if (req.body.fecha_nacimiento) {
        const fecha = new Date(req.body.fecha_nacimiento);
        if (fecha > new Date()) {
          throw new Error('La fecha de nacimiento no puede ser en el futuro');
        }
      }

      await catModel.actualizar(req.params.id, req.body);
      res.redirect('/gatos');
    } catch (err) {
      next(err);
    }
  },

  eliminar: async (req, res, next) => {
    try {
      await catModel.eliminar(req.params.id);
      res.redirect('/gatos');
    } catch (err) {
      next(err);
    }
  },
  detalles: async (req, res, next) => {
    try {
      const { id } = req.params;
      const gato = await catModel.buscarPorIdConClan(id);

      if (!gato) {
        return res.status(404).render('error', { message: 'Gato no encontrado' });
      }

      const nacimiento = new Date(gato.fecha_nacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      if (
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
      ) {
        edad--;
      }

      res.render('gatos/detalles', {
        gato: {
          ...gato,
          edad
        }
      });
    } catch (err) {
      next(err);
    }
  },

generarPDF: async (req, res, next) => {
  try {
    const gatos = await catModel.buscarTodoPorClan();

    if (!Array.isArray(gatos)) {
      throw new Error('La consulta de gatos no retornó un array válido');
    }

    const gatosConEdad = gatos.map(gato => ({
      ...gato,
      edad: calcularEdad(gato.fecha_nacimiento),
      fechaFormateada: gato.fecha_nacimiento 
        ? new Date(gato.fecha_nacimiento).toLocaleDateString('es-ES') 
        : 'Desconocida'
    }));

    const html = await new Promise((resolve, reject) => {
      req.app.render('gatos/pdf', { gatos: gatosConEdad }, (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=gatos.pdf');
    res.send(pdfBuffer);

  } catch (err) {
    next(err);
  }
}

};