//Importing the Home Controller.
const HomeControlador = require('../controladores/home-controlador');
const homeControlador = new HomeControlador();

// Exports the function that will define the routes.
module.exports = (app) => {

  const rotasHome = HomeControlador.rotas();

  app.get(rotasHome.home, homeControlador.indice());

};