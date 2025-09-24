// controllers/userController.js
import * as userService from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validation basique
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l’email existe déjà
    const existing = await userService.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }

    const user = await userService.createUser({ username, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updated = await userService.updateUser(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    if (!deleted) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}

export async function deleteAllUsers(req, res) {
  try {
    await userService.deleteAllUsers();
    res.json({ message: 'Tous les utilisateurs ont été supprimés' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}
