import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Connexions DB
import { db } from './db/mysql.js';
import mongoose from './db/mongo.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.send('API Librairie JV 🚀 - Connexions DB OK');
});

// Route de test MySQL + MongoDB
app.get('/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    const mongoStats = await mongoose.connection.db.stats();

    res.json({
      mysql: rows[0].result,
      mongoCollections: mongoStats.collections
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
