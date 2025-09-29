import { Game } from '../models/Game.js';

export async function getAllGames() {
  return await Game.getAllGames(); 
}

export async function getGameById(id) {
  return await Game.getGameById(id);
}

export async function createGame(data) {
  return await Game.createGame(data); 
}

export async function updateGame(id, data) {
  return await Game.updateGame(id, data); 
}

export async function deleteGame(id) {
  return await Game.deleteGame(id); 
}

export async function deleteAllGames() {
  return await Game.destroy({ where: {} });
}
