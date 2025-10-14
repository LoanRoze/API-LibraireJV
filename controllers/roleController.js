import { roleService } from '../services/index.js';

export async function createRole(req, res, next) {
  try {
    const { name, description } = req.body;
    const role = await roleService.createRole({ name, description });
    res.json(role);
  } catch (err) {
    next(err)
  }
}

export async function getRoles(req, res, next) {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    next(err)
  }
}

export async function updateRole(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body
    const updatedRole = await roleService.updateRole(id, {name, description});
    res.json(updatedRole);
  } catch (err) {
    next(err)
  }
}

export async function deleteRole(req, res, next) {
  try {
    const { id } = req.params;
    await roleService.deleteRole(id);
    res.json({ message: 'Rôle supprimé' });
  } catch (err) {
    next(err)
  }
}

export async function deleteAllRoles(req, res, next) {
  try {
    await roleService.deleteAllRoles();
    res.json({ message: 'Tous les rôles ont été supprimés' });
  } catch (err) {
    next(err)
  }
}
