import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const UserGame = sequelize.define('user_games', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false
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

