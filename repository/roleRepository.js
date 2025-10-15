import { Role } from "../models/index.js";
import { sequelize } from '../db/mysql.js';


export async function createRole({ name, description }) {
  return await Role.create({ name, description });
}

export async function getRoleById(id) {
  return await Role.findByPk(id);
}

export async function getRoleByName(name) {
  return await Role.findOne({ where: { name: name } })
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

export async function deleteAllRolesAndResetIndex() {
  await Role.destroy({ truncate: { cascade : false }})
  await sequelize.query("ALTER TABLE roles AUTO_INCREMENT = 1;")
  return true
}
