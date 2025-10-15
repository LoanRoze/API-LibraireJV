import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: 'unique_role_name' }, // Named unique constraint
  description: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'roles',
  timestamps: true
});

