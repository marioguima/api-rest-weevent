const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// Login do usuário
router.post('/login', userController.login);

// Inserir um usuário
router.post('/', userController.store);

// Verifica Autenticação
//  > dessa linha para baixo todas as rotas precisam estar autenticadas
//  > precisam passar o token para acessar a rota
router.use(authMiddleware);

// Retorna todos os usuários
router.get('/', userController.index);

// Alterar um usuário
router.put('/:user_id', userController.update);

// Excluir um usuário
router.delete('/:user_id', userController.delete);

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