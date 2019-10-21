const LivroDao = require('../../app/infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send(`<html>
              <head>
                <meta charset="utf-8">
              </head>
              <body>
                <h1>Casa do Código.</h1>
              </body>
            </html>`);
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

  app.post('/livros', (req, res) => {
    const livroDao = new LivroDao(db);

    livroDao.adiciona(req.body).then(res.redirect('/livros')).catch((err) => console.log(err));
  });

  app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao.remove(id).then(() =>{
      res.status(200).end();
    }).catch((err) => console.log(err));
  });

};

