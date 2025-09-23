import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'roles'
});