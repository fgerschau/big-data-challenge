module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/dashboard', (req, res) => {
    res.render('dashboard');
  });
};
