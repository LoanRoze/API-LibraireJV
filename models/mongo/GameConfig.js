import mongoose from 'mongoose';

const GameConfigSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  scope: { type: String, enum: ['global', 'user'], default: 'global' },
  userId: { type: String, default: null },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const GameConfig = mongoose.model('GameConfig', GameConfigSchema);

