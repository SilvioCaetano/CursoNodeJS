const template = require('../views/templates')

class HomeControlador {

  static rotas(){
    return {
      home: '/'
    }
  }

  indice(){
     return (req, resp) => {
      resp.marko(
        template.base.base
      );
    }
  }
}

module.exports = HomeControlador;