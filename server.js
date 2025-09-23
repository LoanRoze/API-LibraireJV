import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './db/mysql.js';
import mongoose from './db/mongo.js';
import { GameConfig } from './models/GameConfig.js';


// Import des modèles Sequelize + Mongoose
import './models/index.js';

// console.clear();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.send('API Librairie JV 🚀 - Connexions DB OK');
});

// Route de test pour MySQL et MongoDB
app.get('/test', async (req, res) => {
  try {
    // Test MySQL
    const [rows] = await sequelize.query('SELECT 1 + 1 AS result');

    // Test MongoDB
    const mongoStats = await mongoose.connection.db.stats();

    res.json({
      mysql: rows[0].result,
      mongoCollections: mongoStats.collections
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/gameconfig', async (req, res) => {
  try {
    const config = new GameConfig(req.body);
    await config.save();
    res.status(201).json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer tous les configs de jeu
app.get('/gameconfig', async (req, res) => {
  try {
    const configs = await GameConfig.find();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fonction pour démarrer le serveur après sync
async function startServer() {
  try {
    // Synchronisation Sequelize : crée ou met à jour les tables
    await sequelize.sync({ alter: true });
    console.log('✅ MySQL tables synced');

    // Connexion MongoDB
    await mongoose.connection;
    console.log('✅ MongoDB connected');

    // Lancement serveur
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
  }
}

startServer();
