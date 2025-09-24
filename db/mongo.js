import 'dotenv/config'; // ou import dotenv from 'dotenv'; dotenv.config();
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in .env');
}

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
