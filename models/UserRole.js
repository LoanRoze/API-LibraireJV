import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const UserRole = sequelize.define('user_roles', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'user_roles',
  timestamps: false,
  freezeTableName: true
});

export async function assignRoleToUser(userId, roleId) {
  return await UserRole.findOrCreate({ where: { userId, roleId } })
    .then(([record]) => record);
}

export async function removeRoleFromUser(userId, roleId) {
  const record = await UserRole.findOne({ where: { userId, roleId } });
  if (!record) return null;
  await record.destroy();
  return true;
}

export async function getRolesForUser(userId) {
  return await UserRole.findAll({ where: { userId } });
}

export async function getUsersWithRole(roleId) {
  return await UserRole.findAll({ where: { roleId } });
}


