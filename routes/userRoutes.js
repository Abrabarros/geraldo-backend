const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Rota para obter todos os usuários - rota protegida
router.route('/').get(protect, getUsers);

// Rota para obter, atualizar ou deletar um usuário por ID - rotas protegidas
router.route('/:id').get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
