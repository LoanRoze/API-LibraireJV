import { Role } from '../models/Role.js';

export async function getAllRoles() {
  return await Role.findAll();
}

export async function getRoleById(id) {
  return await Role.findByPk(id);
}

export async function createRole(data) {
  return await Role.create(data);
}

export async function updateRole(id, data) {
  const role = await Role.findByPk(id);
  if (!role) return null;
  return await role.update(data);
}

export async function deleteRole(id) {
  const role = await Role.findByPk(id);
  if (!role) return null;
  await role.destroy();
  return true;
}

export async function findRoleByName(name) {
  return await Role.findOne({ where: { name } });
}

export async function deleteAllRoles() {
  return await Role.destroy({ where: {} });
}
