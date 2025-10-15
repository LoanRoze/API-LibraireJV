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

