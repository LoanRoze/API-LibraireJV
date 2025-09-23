import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const Game = sequelize.define('Game', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'games'
});