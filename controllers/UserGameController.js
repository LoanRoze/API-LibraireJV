import * as userGameService from '../services/userGameService.js';

export async function getAllUserGames(req, res) {
  try {
    const userGames = await userGameService.getAllUserGames();
    res.json(userGames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserGameById(req, res) {
  try {
    const userGame = await userGameService.getUserGameById(req.params.id);
    if (!userGame) return res.status(404).json({ error: 'UserGame not found' });
    res.json(userGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUserGame(req, res) {
  try {
    const { userId, gameId, progress, lastPlayed } = req.body;
    const newUserGame = await userGameService.createUserGame({ userId, gameId, progress, lastPlayed });
    res.status(201).json(newUserGame);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUserGame(req, res) {
  try {
    const updated = await userGameService.updateUserGame(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'UserGame not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUserGame(req, res) {
  try {
    const deleted = await userGameService.deleteUserGame(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'UserGame not found' });
    res.json({ message: 'UserGame deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
