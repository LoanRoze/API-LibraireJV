import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const UserGame = sequelize.define('user_games', {
  
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  gameId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'games',
      key: 'id'
    }
  }
}, {
  tableName: 'user_games',
  timestamps: false,
  freezeTableName: true
});

export async function createUserGame(data) {
  return await UserGame.create(data);
}

export async function getUserGameById(id) {
  return await UserGame.findByPk(id);
}

export async function getAllUserGames() {
  return await UserGame.findAll();
}

export async function checkIfUserGameExists(userId, gameId) {
  const userGame = await UserGame.findOne({ where: { userId: userId, gameId: gameId } })
  return userGame
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
  return true;
}

export async function deleteAllUserGamesAndResetIndex() {
  await UserGame.destroy({ truncate: { cascade: false } });
  await sequelize.query("ALTER TABLE user_games AUTO_INCREMENT = 1;");
  return true;
}
