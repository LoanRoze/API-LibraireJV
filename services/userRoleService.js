import { userRepository, roleRepository, userRoleRepository } from '../repository/index.js';

import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js';

export async function assignRoleToUser({ userId, roleId }) {
  console.log(userId, roleId)
  if (!userId || !roleId) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await userRepository.getUserById(userId)
  const role = await roleRepository.getRoleById(roleId)
  if (!user || !role) {
    throw new NotFoundError("Le role ou l'utilisateur n'existent pas")
  }
  const existing = await userRoleRepository.checkIfUserRoleExists(userId, roleId)
  if (existing) {
    throw new ConflictError("Ce role appartient déjà a cet utilisateur")
  }
  return await userRoleRepository.assignRoleToUser({ userId, roleId });
}

export async function getUserRoles() {
  const userRoles = await userRoleRepository.getAllUserRoles()
  const formattedUserRoles = userRoles.map((userGame) => {
    return {
      userId: userGame.userId,
      roleId: userGame.roleId
    }
  })
  return formattedUserRoles;
}

export async function getUserRoleById(id) {
  const userRole = await userRoleRepository.getUserRoleById(id)
  if (!userRole) {
    throw new NotFoundError('User-Role non trouvé')
  }
  return {
    userId: userRole.userId,
    gameId: userRole.gameId
  };
}


export async function updateUserRole(id, { userId, roleId }) {
  if (!userId || !roleId) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await userRepository.getUserById(userId)
  const role = await roleRepository.getUserById(roleId)
  if (!user || !role) {
    throw new NotFoundError("Le role ou l'utilisateur n'existent pas")
  }
  const userRole = await userRoleRepository.getUserRoleById(id)
  if (!userRole) {
    throw new NotFoundError('User-Role non trouvé')
  }
  const existing = await userRoleRepository.checkIfUserRoleExists(userId, gameId)
  if (existing) {
    throw new ConflictError("Ce role appartient déjà a cet utilisateur")
  }
  return await userRole.update(data);
}

export async function deleteUserRole(id) {
  const userRole = await userRoleRepository.getUserRoleById(id);
  if (!userRole) {
    throw new NotFoundError('User-Role non trouvé')
  }
  return await userRole.deleteUserRole();
}

export async function deleteAllUserRoles() {
  return await userRoleRepository.deleteAllUserRolesAndResetIndex();
}
