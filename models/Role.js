import { DataTypes } from 'sequelize';
import { sequelize } from '../db/mysql.js';

export const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'roles',
  timestamps: true,
  hooks: {
    afterBulkDestroy: async (options) => {
      if (options.truncate) {
        await sequelize.query('ALTER TABLE roles AUTO_INCREMENT = 1;');
      }
    }
  }
});

// CRUD
export async function createRole({ name, description }) {
  return await Role.create({ name, description });
}

export async function getRoleById(id) {
  return await Role.findByPk(id);
}

export async function getAllRoles() {
  return await Role.findAll();
}

export async function updateRole(id, payload) {
  const role = await getRoleById(id);
  if (!role) return null;
  return await role.update(payload);
}

export async function deleteRole(id) {
  const role = await getRoleById(id);
  if (!role) return null;
  await role.destroy();
  return true;
}
