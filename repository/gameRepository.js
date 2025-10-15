import { Game } from "../models/index.js";
import { sequelize } from '../db/mysql.js';


export async function createGame(payload) {
  return await Game.create(payload);
}

export async function getGameById(id) {
  return await Game.findByPk(id);
}

export async function getGameByTitle(title) {
  return await Game.findOne({where: {title: title}})
}

export async function getAllGames(options = {}) {
  return await Game.findAll(options);
}

export async function updateGame(id, payload) {
  const game = await getGameById(id);
  if (!game) return null;
  return await game.update(payload);
}

export async function deleteGame(id) {
  const game = await getGameById(id);
  if (!game) return null;
  await game.destroy();
  return true;
}

export async function deleteAllGamesAndResetIndex() {
  await Game.destroy({ truncate: { cascade : false }})
  await sequelize.query("ALTER TABLE games AUTO_INCREMENT = 1;")
  return true
}
