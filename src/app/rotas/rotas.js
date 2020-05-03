// Return the LivroDao class with all data access methods from Livros.
const LivroDao = require('../../app/infra/livro-dao');
// Configure the SqlLite 3 Database.
const db = require('../../config/database');

// Gets the objects that will handle form validations.
const { check, validationResult } = require('express-validator/check');

// Exports the function that will define the routes.
module.exports = (app) => {

  app.get('/', function (req, resp) {
    resp.marko(
      require('../views/base/home/home.marko')
    );
  });

  app.get('/livros', (req, res) => {

    const livroDao = new LivroDao(db);

    livroDao.lista().then((livros) => {

      res.marko(require('../views/livros/lista/lista.marko'),
        {
          livros: livros
        }
      );
      
    }).catch((err) => console.log(err));
  });

  app.get('/livros/form', (req, res) => {

    res.marko(require('../views/livros/form/form.marko'), { livro: {} });

  });

  app.get('/livros/form/:id', (req, res) => {
    const id = req.params.id;
    const livroDao = new LivroDao(db);
    livroDao.buscaPorId(id).then(livro => {
      res.marko(require('../views/livros/form/form.marko'), { livro });
    }).catch((err) => console.log(err));

  });

  app.post('/livros', [
    check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
    check('preco').isCurrency().withMessage('O preço deve ter o valor monetário.')
  ], function (req, resp) {
    console.log(req.body);
    const livroDao = new LivroDao(db);

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return resp.marko(
        require('../views/livros/form/form.marko'),
        {
          livro: req.body,
          errosValidacao: erros.array()
        }
      );
    }

    livroDao.adiciona(req.body)
      .then(resp.redirect('/livros'))
      .catch(erro => console.log(erro));
  });

  app.put('/livros', [
    check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
    check('preco').isCurrency().withMessage('O preço deve ter o valor monetário.')
  ], (req, res) => {
    console.log(req.body);
    const livroDao = new LivroDao(db);

    const erros = validationResult(req);

    if(!erros.isEmpty()){
      return res.marko(
        require('../views/livros/form/form.marko'),
        {
          livro: req.body,
          errosValidacao: erros.array()
        }
      );
    }

    livroDao.atualizar(req.body).then(res.redirect('/livros')).catch((err) => console.log(err));
  });

  app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao.remove(id).then(() =>{
      res.status(200).end();
    }).catch((err) => console.log(err));
  });

};

