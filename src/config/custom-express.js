// Installing the Marko that will take care of the frontend.
require('marko/node-require').install();
require('marko/express');

// This require will return the initial express function e.
const express = require('express');
// The express function will return the Express class which is our base express application.
const app = express();
// The body-parser is going to parse the data from a POST/PUT body HTTP requests.
const bodyParser = require('body-parser');
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require('method-override');

// Includes the visual elements and other static scripts to be used in our application.
app.use('/estatico', express.static('src/app/public'));

// Configuring the body parser and includes it in the middleware list.
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configuring the Method Override.
app.use(methodOverride((req, res) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body ) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Calling the void function in rotas.js to configure the routes.
require('../app/rotas/rotas')(app);

const template = require('../app/views/templates')

// Including the middleware that wil handle 404 errors. 
app.use((req, res, next) => {
  return res.status(404).marko(template.base.erro404);
});

// Including the middleware that wil handle 500 errors.
app.use((erro, req, res, next) => {
  return res.status(500).marko(template.base.erro500);
});

// Send back to the caller sthe Express app with all configurations.
module.exports = app;




