import mongoose from 'mongoose';

const gameConfigSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // référence à l'utilisateur
  gameId: { type: String, required: true }, // référence au jeu dans MySQL
  settings: { type: Object, default: {} } // config spécifique du jeu
}, { timestamps: true });

export const GameConfig = mongoose.model('GameConfig', gameConfigSchema);