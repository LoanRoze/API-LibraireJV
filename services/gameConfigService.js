import { GameConfig } from '../models/mongo/GameConfig.js';

export async function getGameConfigByGameId(gameId) {
  return await GameConfig.findOne({ gameId });
}

export async function createOrUpdateGameConfig(gameId, data) {
  return await GameConfig.findOneAndUpdate(
    { gameId },
    { $set: data },
    { new: true, upsert: true }
  );
}

export async function getConfig(gameId) {
  return await GameConfig.findOne({ gameId });
}

export async function setConfig(gameId, data) {
  return await GameConfig.findOneAndUpdate(
    { gameId },
    { $set: data },
    { new: true, upsert: true }
  );
}
