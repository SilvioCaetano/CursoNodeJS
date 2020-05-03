// The require Method will execute the code in config-express.js which returns an Express instance.
const app = require('./src/config/custom-express');

// This method will listen to a port and will execute the callback function.
app.listen(3000, () => {
  console.log('Servidor rodando na Porta 3000.');
});