const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// Login do usuário
router.post('/login', userController.login);

router.use(authMiddleware);

// Retorna todos os usuários
router.get('/', userController.index);

// Inserir um usuário
router.post('/', userController.store);

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