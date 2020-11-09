const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.routes');
const eventsRoutes = require('./routes/events.routes');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false })); // aceitar apenas dados simples
app.use(bodyParser.json()); // apenas json de entrada no body

// Restrições CORS
app.use((req, res, next) => {
  // permitido para todos
  res.header('Access-Control-Allow-Origin', '*');

  // dessa maneira restringe a uma url
  // res.header('Access-Control-Allow-Origin', 'https://marioguimaraes.com.br/')

  // o que vamos aceitar no header
  res.header('Access-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }

  next();

})

// Rotas
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);

app.use('/test', (req, res, next) => {
  res.status(200).send({
    message: 'Server OK'
  });
});

// Rotas que não existem
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.name = '404';
  next(err);
});

// Erro 404 ou 500
app.use((error, req, res, next) => {
  const status = error.name == '404' ? 404 : res.status;
  res.status(status || 500);
  return res.send({
    erro: {
      message: error.message
    }
  });
});

module.exports = app;