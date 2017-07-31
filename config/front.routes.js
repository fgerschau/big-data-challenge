module.exports = function (app) {
  app.get('/', (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });
};
