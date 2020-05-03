// Exports the function that will define the routes.
module.exports = (app) => {

  const livroRotas = require('./livros-rotas');
  const homeRotas = require('./home-rotas');

  livroRotas(app);
  homeRotas(app);

};

