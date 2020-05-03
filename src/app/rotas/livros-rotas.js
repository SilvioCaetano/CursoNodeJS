// Importing the livro controller.
const LivroControlador = require('../controladores/livro-controlador');
const livroControlador = new LivroControlador();


const Livro = require('../modelos/livro');

// Exports the function that will define the routes.
module.exports = (app) => {

  const rotasLivro = LivroControlador.rotas();

  app.get(rotasLivro.lista, livroControlador.lista());

  app.route(rotasLivro.cadastro)
    .get(livroControlador.cadastro())
    .post(Livro.validate(), livroControlador.adiciona())
    .put(livroControlador.atualiza());

  app.get(rotasLivro.edicao, livroControlador.edicao());

  app.delete(rotasLivro.delecao, livroControlador.remove());

};