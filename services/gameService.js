import { Game } from '../models/Game.js';

export async function getAllGames() {
  return await Game.findAll();
}

export async function getGameById(id) {
  return await Game.findByPk(id);
}

export async function createGame(data) {
  return await Game.create(data);
}

export async function updateGame(id, data) {
  const game = await Game.findByPk(id);
  if (!game) return null;
  return await game.update(data);
}

export async function deleteGame(id) {
  const game = await Game.findByPk(id);
  if (!game) return null;
  return await game.destroy();
}

export async function deleteAllGames() {
  return await Game.destroy({ where: {} });
}
