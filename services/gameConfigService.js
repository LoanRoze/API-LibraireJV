import { gameConfigRepository } from '../repository/index.js';

export async function getGameConfigByGameId(gameId) {
  return await gameConfigRepository.findOne({ gameId });
}

export async function createOrUpdateGameConfig(gameId, data) {
  return await gameConfigRepository.findOneAndUpdate(
    { gameId },
    { $set: data },
    { new: true, upsert: true }
  );
}

export async function getConfig(gameId) {
  return await gameConfigRepository.findOne({ gameId });
}

export async function setConfig(gameId, data) {
  return await gameConfigRepository.findOneAndUpdate(
    { gameId },
    { $set: data },
    { new: true, upsert: true }
  );
}
