const express = require('express');
const router = express.Router();

// Retorna todos os usuários
router.get('/', (req, res, next) => {
  res.status(200).send({
    message: 'List of users'
  });
});

// Inserir um usuário
router.post('/', (req, res, next) => {
  const user = {
    id_user: req.body.id_user,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  res.status(201).send({
    message: 'Inserted user',
    user: user
  });
});

// Alterar um usuário
router.patch('/', (req, res, next) => {
  res.status(201).send({
    message: 'Updated user'
  });
});

// Excluir um usuário
router.delete('/', (req, res, next) => {
  res.status(201).send({
    message: 'Deleted user'
  });
});

// Retorna os dados de um usuário
router.get('/:id_user', (req, res, next) => {
  const id = req.params.id_user;

  res.status(200).send({
    message: 'User details',
    id_user: id
  });

});


module.exports = router;