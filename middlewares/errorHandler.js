module.exports = (err, req, res, next) => {
  console.error('🔴 Error:', err.stack);
  res.status(500).render('error', { message: 'Algo salió mal en NULLCATIA.' });
};
