const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Usuário já registrado' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      // Retorna o token e o nome do usuário
      res.status(200).json({ 
        token, 
        user: { name: user.name, email: user.email } 
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro no servidor' });
    }
  };
  

module.exports = { registerUser, loginUser };
