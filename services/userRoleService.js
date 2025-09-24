import { UserRole, User, Role } from '../models/index.js';

export async function getUserRoles() {
  return await UserRole.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Role, as: 'role' }
    ]
  });
}

export async function getUserRoleById(id) {
  return await UserRole.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Role, as: 'role' }
    ]
  });
}

export async function assignRoleToUser(userId, roleId) {
  return await UserRole.create({ userId, roleId });
}

export async function updateUserRole(id, data) {
  const userRole = await UserRole.findByPk(id);
  if (!userRole) return null;
  return await userRole.update(data);
}

export async function deleteUserRole(id) {
  const userRole = await UserRole.findByPk(id);
  if (!userRole) return null;
  await userRole.destroy();
  return userRole;
}

export async function findUserRole(userId, roleId) {
  return await UserRole.findOne({ where: { userId, roleId } });
}

export async function deleteAllUserRoles() {
  return await UserRole.destroy({ where: {} });
}
