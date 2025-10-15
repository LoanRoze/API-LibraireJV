import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const UserRole = sequelize.define('user_roles', {
   userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  tableName: 'user_roles',
  timestamps: false,
  freezeTableName: true
});

