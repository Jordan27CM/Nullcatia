const catModel = require('../models/catModel');
const clanModel = require('../models/clanModel');

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 'Edad desconocida';
  
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  
  // Diferencia en milisegundos
  const diff = hoy - nacimiento;
  
  // Convertir a años
  const edadAnios = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  
  // Convertir a meses si es menor de 1 año
  if (edadAnios < 1) {
    const edadMeses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return `${edadMeses} ${edadMeses === 1 ? 'mes' : 'meses'}`;
  }
  
  return `${edadAnios} ${edadAnios === 1 ? 'año' : 'años'}`;
}

module.exports = {
  list: async (req, res, next) => {
    try {
      const { nombre, clan_id } = req.query;

      // Obtener gatos según filtros
      const gatos = await catModel.findWithFilters(nombre, clan_id);

      // Calcular edad y formatear fecha
      const gatosConEdad = gatos.map(gato => ({
        ...gato,
        edad: calcularEdad(gato.fecha_nacimiento),
        fechaFormateada: gato.fecha_nacimiento 
          ? new Date(gato.fecha_nacimiento).toLocaleDateString('es-ES') 
          : 'Desconocida'
      }));

      // Obtener lista de clanes para el filtro
      const clanes = await clanModel.findAll();

      res.render('gatos/list', {
        gatos: gatosConEdad,
        clanes,
        filtroNombre: nombre,
        filtroClan: clan_id
      });
    } catch (err) {
      next(err);
    }
  },

  showForm: async (req, res, next) => {
    try {
      const clanes = await clanModel.findAll();
      res.render('gatos/form', { clanes });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      // Validar campos requeridos
      if (!req.body.nombre || !req.body.raza || !req.body.fecha_nacimiento || !req.body.clan_id) {
        throw new Error('Todos los campos son requeridos');
      }

      // Validar fecha de nacimiento
      const fechaNacimiento = new Date(req.body.fecha_nacimiento);
      if (fechaNacimiento > new Date()) {
        throw new Error('La fecha de nacimiento no puede ser en el futuro');
      }

      // Preparar datos para el modelo
      const gatoData = {
        nombre: req.body.nombre,
        raza: req.body.raza,
        fecha_nacimiento: req.body.fecha_nacimiento,
        clan_id: req.body.clan_id
      };

      // Crear el gato en la base de datos
      await catModel.create(gatoData);
      
      // Redirigir a la lista de gatos
      res.redirect('/gatos');
    } catch (err) {
      // Manejo de errores con recuperación de clanes para el formulario
      try {
        const clanes = await clanModel.findAll();
        res.render('gatos/form', { 
          clanes,
          error: err.message,
          formData: req.body // Mantener los datos ingresados
        });
      } catch (error) {
        next(error);
      }
    }
  },

  editForm: async (req, res, next) => {
  try {
    const gato = await catModel.findById(req.params.id);
    const clanes = await clanModel.findAll();
    
    const gatoConEdad = {
      ...gato,
      fechaFormateada: gato.fecha_nacimiento 
        ? new Date(gato.fecha_nacimiento).toISOString().split('T')[0]
        : ''
    };
    
    res.render('gatos/edit', { gato: gatoConEdad, clanes });
  } catch (err) {
    next(err);
  }
},

  update: async (req, res, next) => {
    try {
      // Validar fecha de nacimiento antes de actualizar
      if (req.body.fecha_nacimiento) {
        const fecha = new Date(req.body.fecha_nacimiento);
        if (fecha > new Date()) {
          throw new Error('La fecha de nacimiento no puede ser en el futuro');
        }
      }
      
      await catModel.update(req.params.id, req.body);
      res.redirect('/gatos');
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await catModel.delete(req.params.id);
      res.redirect('/gatos');
    } catch (err) {
      next(err);
    }
  },
  detail: async (req, res, next) => {
  try {
    const { id } = req.params;
    const gato = await catModel.findByIdWithClan(id);

    if (!gato) {
      return res.status(404).render('error', { message: 'Gato no encontrado' });
    }

    // Calcular edad
    const nacimiento = new Date(gato.fecha_nacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (
      hoy.getMonth() < nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    res.render('gatos/detail', {
      gato: {
        ...gato,
        edad
      }
    });
  } catch (err) {
    next(err);
  }
}

};