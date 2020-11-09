const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Login do usuário
router.post('/login', userController.login);

// Retorna todos os usuários
router.get('/', userController.index);

// router.get('/', (req, res, next) => {
//   res.status(200).send({
//     message: 'List of users'
//   });
// });

// Inserir um usuário
router.post('/', userController.store);

// router.post('/', (req, res, next) => {
//   const user = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }

//   res.status(201).send({
//     message: 'Inserted user',
//     user: user
//   });
// });

// Alterar um usuário
router.put('/', userController.update);

// router.patch('/', (req, res, next) => {
//   res.status(201).send({
//     message: 'Updated user'
//   });
// });

// Excluir um usuário
router.delete('/', userController.delete);

// router.delete('/', (req, res, next) => {
//   res.status(201).send({
//     message: 'Deleted user'
//   });
// });

// Retorna os dados de um usuário
// router.get('/:user_id', userController.list);

// router.get('/:user_id', (req, res, next) => {
//   const id = req.params.user_id;

//   res.status(200).send({
//     message: 'User details',
//     user_id: id
//   });

// });


module.exports = router;