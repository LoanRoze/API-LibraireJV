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
export async function checkIfUserRoleExists(userId, roleId) {
  const userRole = await UserRole.findOne({where : {userId: userId, roleId: roleId}})
  return userRole
}

export async function deleteAllUserRolesAndResetIndex() {
    await UserRole.destroy({ truncate: { cascade: false } });
    await sequelize.query("ALTER TABLE user_roles AUTO_INCREMENT = 1;");
    return true;
}