import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './db/mysql.js';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import { setupSwagger } from './config/swagger.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

setupSwagger(app);


app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API Librairie JV 🚀 - Connexions DB OK');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📘 Documentation Swagger : http://localhost:${PORT}/api-docs`);

    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
  }
};

startServer();
