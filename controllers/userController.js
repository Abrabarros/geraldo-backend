const User = require('../models/User');

// Obter todos os usuários
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Não retorna as senhas
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};

// Obter usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
};

// Atualizar usuário
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Deletar usuário
const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.status(200).json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      console.error(error); // Loga o erro no console para obter mais detalhes
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  };
  

module.exports = { getUsers, getUserById, updateUser, deleteUser };
