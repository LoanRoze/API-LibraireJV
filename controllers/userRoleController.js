import * as userRoleService from '../services/userRoleService.js';

export async function getUserRoles(req, res) {
  try {
    const userRoles = await userRoleService.getUserRoles();
    res.json(userRoles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserRoleById(req, res) {
  try {
    const userRole = await userRoleService.getUserRoleById(req.params.id);
    if (!userRole) return res.status(404).json({ error: 'UserRole not found' });
    res.json(userRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function assignRoleToUser(req, res) {
  try {
    const { userId, roleId } = req.body;
    const newUserRole = await userRoleService.assignRoleToUser(userId, roleId);
    res.status(201).json(newUserRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUserRole(req, res) {
  try {
    const updated = await userRoleService.updateUserRole(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'UserRole not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUserRole(req, res) {
  try {
    const deleted = await userRoleService.deleteUserRole(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'UserRole not found' });
    res.json({ message: 'UserRole deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteAllUserRoles(req, res) {
  try {
    await userRoleService.deleteAllUserRoles();
    res.json({ message: 'Tous les UserRoles ont été supprimés' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
