// controllers/roleController.js
import * as roleService from '../services/roleService.js';

export async function createRole(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Le nom est requis' });

    const existing = await roleService.findRoleByName(name);
    if (existing) return res.status(409).json({ message: 'Rôle déjà existant' });

    const role = await roleService.createRole({ name });
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function getRoles(req, res) {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const updated = await roleService.updateRole(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Rôle introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const deleted = await roleService.deleteRole(id);
    if (!deleted) return res.status(404).json({ message: 'Rôle introuvable' });
    res.json({ message: 'Rôle supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function deleteAllRoles(req, res) {
  try {
    await roleService.deleteAllRoles();
    res.json({ message: 'Tous les rôles ont été supprimés' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}
