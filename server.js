const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Importação das rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Rotas para usuários
const postRoutes = require('./routes/postRoutes'); // Rotas para fofocas (posts)

// Carrega variáveis de ambiente
dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Adicione esta linha para verificar



// Conecta ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(helmet()); // Segurança
app.use(morgan('dev')); // Logs de requisições
app.use(cors()); // Compartilhamento de recursos entre diferentes origens (CORS)
app.use(express.json()); // Para processar JSON no corpo das requisições

// Rotas
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/posts', postRoutes); // Rotas de fofocas (posts)

// Porta e inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
