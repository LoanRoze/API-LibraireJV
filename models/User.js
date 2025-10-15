import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: 'unique_user_username' }, // Named unique constraint
  email: { type: DataTypes.STRING, allowNull: true, unique: 'unique_user_email' },       // Named unique constraint
  password: { type: DataTypes.STRING, allowNull: false } // Store hashed password
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    afterBulkDestroy: async (options) => {
      if (options.truncate) {
        await sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1;');
      }
    }
  }
});

