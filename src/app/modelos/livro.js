// Gets the objects that will handle form validations.
const { check } = require('express-validator/check');

class Livro {
  static validate(){
    return [
      check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres.'),
      check('preco').isCurrency().withMessage('O preço deve ter o valor monetário.')
    ];
  }
}

module.exports = Livro;