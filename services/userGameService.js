import { UserGame, User, Game } from '../models/index.js';

export async function getAllUserGames() {
  return await UserGame.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Game, as: 'game' }
    ]
  });
}

export async function getUserGameById(id) {
  return await UserGame.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Game, as: 'game' }
    ]
  });
}

export async function createUserGame(data) {
  return await UserGame.create(data);
}

export async function updateUserGame(id, data) {
  const userGame = await UserGame.findByPk(id);
  if (!userGame) return null;
  return await userGame.update(data);
}

export async function deleteUserGame(id) {
  const userGame = await UserGame.findByPk(id);
  if (!userGame) return null;
  await userGame.destroy();
  return userGame;
}
