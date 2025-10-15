import { DataTypes, where } from 'sequelize';
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

