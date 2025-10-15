import { GameConfig } from "../models/index.js";



export async function getConfigByGameId(gameId) {
  return await GameConfig.findOne({ gameId, scope: 'global' });
}

export async function getUserGameConfig(userId, gameId) {
  return await GameConfig.findOne({ userId, gameId, scope: 'user' });
}

export async function createOrUpdateGameConfig({ gameId, scope = 'global', userId = null, settings = {} }) {
  const filter = scope === 'user' ? { gameId, userId, scope } : { gameId, scope };
  const update = { settings, updatedAt: new Date() };
  return await GameConfig.findOneAndUpdate(filter, { $set: update }, { new: true, upsert: true });
}

export async function deleteGameConfig({ gameId, scope = 'global', userId = null }) {
  const filter = scope === 'user' ? { gameId, userId, scope } : { gameId, scope };
  return await GameConfig.findOneAndDelete(filter);
}

