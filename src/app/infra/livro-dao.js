class LivroDao{
  constructor(db){
    this._db = db;
  }

  lista(){
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM livros',
        (erro, resultado) => {
          if(erro){
            return reject('Não foi possível listar os livros.')
          }
          return resolve(resultado);
        }
      );
    });
    
  }

  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this._db.get('SELECT * FROM livros WHERE id = ?',
        [id],
        (erro, resultado) => {
          if (erro) {
            return reject('Não foi possível listar os livros.')
          }
          return resolve(resultado);
        }
      );
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run('INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)', 
                    [livro.titulo, livro.preco, livro.descricao], 
                    (erro) => {
                      if(erro)
                      {
                        console.log(erro)
                        return reject('Não foi possível incluir o livro.');                        
                      }
                      
                      return resolve();
                    });
    });
  }

  atualizar(livro) {
    return new Promise((resolve, reject) => {
      this._db.run('UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        (erro) => {
          if (erro) {
            console.log(erro)
            return reject('Não foi possível excluir o livro.');
          }

          return resolve();
        });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this._db.run('DELETE FROM livros WHERE id = ?',
        [id],
        (erro) => {
          if (erro) {
            console.log(erro)
            return reject('Não foi possível excluir o livro.');
          }

          return resolve();
        });
    });
  }
}

module.exports = LivroDao;