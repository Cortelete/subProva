const express = require('express');
const connectDB = require('./config/db'); // Importa a função de conexão

const heroRoutes = require('./routes/heroRoutes');
const monsterRoutes = require('./routes/monsterRoutes');
const combatRoutes = require('./routes/combatRoutes');

const app = express();
app.use(express.json());

// Conectando ao MongoDB
connectDB(); // Chama a função para conectar ao MongoDB

// Usando rotas
app.use(heroRoutes);
app.use(monsterRoutes);
app.use(combatRoutes);

// Iniciando o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
