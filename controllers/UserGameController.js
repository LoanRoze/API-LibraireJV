import { userGameService } from '../services/index.js';

export async function getAllUserGames(req, res) {
  try {
    const userGames = await userGameService.getAllUserGames();
    res.json(userGames);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function getUserGameById(req, res) {
  try {
    const userGame = await userGameService.getUserGameById(req.params.id);
    res.json(userGame);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function createUserGame(req, res) {
  try {
    const { userId, gameId, progress, lastPlayed } = req.body;
    const newUserGame = await userGameService.createUserGame({ userId, gameId, progress, lastPlayed });
    res.json(newUserGame);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function updateUserGame(req, res) {
  try {
    const updated = await userGameService.updateUserGame(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteUserGame(req, res) {
  try {
    const deleted = await userGameService.deleteUserGame(req.params.id);
    res.json({ message: 'UserGame deleted' });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export async function deleteAllUserGames(req, res) {
  try {
    await userGameService.deleteAllUserGames();
    res.json({ message: 'Tous les UserRoles ont été supprimés' });
  } catch (err) {
    res.json({ error: err.message });
  }
}

