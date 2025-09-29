import { Role } from '../models/Role.js';

export async function getAllRoles() {
  return await Role.getAllRoles(); 
}

export async function getRoleById(id) {
  return await Role.getRoleById(id); 
}

export async function createRole(data) {
  return await Role.createRole(data);
}

export async function updateRole(id, data) {
  return await Role.updateRole(id, data);
}

export async function deleteRole(id) {
  return await Role.deleteRole(id);
}

export async function findRoleByName(name) {
  return await Role.findOne({ where: { name } }); 
}

export async function deleteAllRoles() {
  return await Role.destroy({ where: {} });
}
