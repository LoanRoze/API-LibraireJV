import { userRoleService } from '../services/index.js';

export async function getUserRoles(req, res) {
  try {
    const userRoles = await userRoleService.getUserRoles();
    res.json(userRoles);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserRoleById(req, res) {
  try {
    const userRole = await userRoleService.getUserRoleById(req.params.id);
    res.json(userRole);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function assignRoleToUser(req, res) {
  try {
    const { userId, roleId } = req.body;
    console.log(userId, roleId)
    const newUserRole = await userRoleService.assignRoleToUser({userId, roleId});
    res.json(newUserRole);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function updateUserRole(req, res) {
  try {
    const updated = await userRoleService.updateUserRole(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteUserRole(req, res) {
  try {
    const deleted = await userRoleService.deleteUserRole(req.params.id);
    res.json({ message: 'UserRole deleted' });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteAllUserRoles(req, res) {
  try {
    await userRoleService.deleteAllUserRoles();
    res.json({ message: 'Tous les UserRoles ont été supprimés' });
  } catch (err) {
    res.json({ error: err.message });
  }
}
