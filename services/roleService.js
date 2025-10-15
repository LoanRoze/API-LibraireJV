import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js';
import { roleRepository } from '../repository/index.js';

export async function createRole({ name, description }) {
  if (!name || !description) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await roleRepository.getRoleByName(name);
  if (existing) {
    throw new ConflictError(`Le rôle "${name}" existe déjà`);
  }

  const role = await roleRepository.createRole({ name, description })
  return role.dataValues;
}

export async function getRoleById(id) {
  const role = await roleRepository.getRoleById(id)
  if (!role) {
    throw new NotFoundError('Role non trouvé')
  }
  return {
    name: role.name,
    description: role.description
  };
}

export async function getRoleByName(name) {
  const role = await roleRepository.getRoleByName(name)
  if (!role) {
    throw new NotFoundError('Role non trouvé')
  }
  return {
    name: role.name,
    description: role.description
  };
}

export async function getAllRoles() {
  const roles = await roleRepository.getAllRoles();
  const formattedRoles = roles.map((role) => {
    return {
      name: role.name,
      description: role.description
    }
  })
  return formattedRoles
}



export async function updateRole(id, { name, description }) {
  if (!name || !description) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await roleRepository.getRoleByName(name);
  if (existing) {
    throw new ConflictError(`Le rôle "${name}" existe déjà`);
  }
  const role = await roleRepository.getRoleById(id)
  if (!role) {
    throw new NotFoundError("Le rôle n'existe pas")
  }

  const updatedRole = await roleRepository.updateRole(id, { name, description });
  return updatedRole.dataValues;
}

export async function deleteRole(id) {
  const role = await roleRepository.getRoleById(id);
  if (!role) throw new NotFoundError('Utilisateur non trouvé');

  return await roleRepository.deleteRole(id);
}



export async function deleteAllRoles() {
  return await roleRepository.deleteAllRolesAndResetIndex();
}
