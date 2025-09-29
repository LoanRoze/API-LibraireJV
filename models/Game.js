import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const Game = sequelize.define('Game', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false, unique: 'unique_game_title' }, // Named unique constraint
  description: { type: DataTypes.TEXT, allowNull: true },
  genre: { type: DataTypes.STRING, allowNull: true },
  releaseYear: { type: DataTypes.INTEGER, allowNull: true },
  logoUrl: { type: DataTypes.STRING, allowNull: true }
}, {
  tableName: 'games',
  timestamps: true,
  hooks: {
    afterBulkDestroy: async (options) => {
      if (options.truncate) {
        await sequelize.query('ALTER TABLE games AUTO_INCREMENT = 1;');
      }
    }
  }
});

export async function createGame(payload) {
  return await Game.create(payload);
}

export async function getGameById(id) {
  return await Game.findByPk(id);
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
