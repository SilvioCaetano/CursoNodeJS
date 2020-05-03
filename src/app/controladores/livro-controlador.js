// Return the LivroDao class with all data access methods from Livros.
const LivroDao = require('../../app/infra/livro-dao');
// Configure the SqlLite 3 Database.
const db = require('../../config/database');

// Gets the objects that will handle form validations.
const { validationResult } = require('express-validator/check');

const templates = require('../views/templates');

class LivroControlador {

  static rotas(){
    return {
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id'
    }
  }

  lista() {
    return (req, res) => {

      const livroDao = new LivroDao(db);

      livroDao.lista().then((livros) => {

        res.marko(templates.livros.lista,
          {
            livros: livros
          }
        );

      }).catch((err) => console.log(err));
    }
  }

  cadastro() {
    return (req, res) => {

      res.marko(templates.livros.form, { livro: {} });

    }
  }

  edicao() {
    return (req, res) => {
      const id = req.params.id;
      const livroDao = new LivroDao(db);
      livroDao.buscaPorId(id).then(livro => {
        res.marko(templates.livros.form, { livro });
      }).catch((err) => console.log(err));

    }
  }

  adiciona() {
    return (req, resp) => {
      console.log(req.body);
      const livroDao = new LivroDao(db);

      const erros = validationResult(req);

      if (!erros.isEmpty()) {
        return resp.marko(
          templates.livros.form,
          {
            livro: req.body,
            errosValidacao: erros.array()
          }
        );
      }

      livroDao.adiciona(req.body)
        .then(resp.redirect(LivroControlador.rotas().lista))
        .catch(erro => console.log(erro));
    }
  }

  atualiza() {
    return (req, res) => {
      console.log(req.body);
      const livroDao = new LivroDao(db);

      livroDao.atualizar(req.body).then(res.redirect(LivroControlador.rotas().lista)).catch((err) => console.log(err));
    }
  }

  remove(){
    return (req, res) => {
      const id = req.params.id;

      const livroDao = new LivroDao(db);
      livroDao.remove(id).then(() => {
        res.status(200).end();
      }).catch((err) => console.log(err));
    }
  }
}

module.exports = LivroControlador;