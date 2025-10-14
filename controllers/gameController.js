import * as gameService from '../services/gameService.js';

export async function createGame(req, res) {
  try {
    const { title, description, genre, releaseYear, logoUrl } = req.body;
    const game = await gameService.createGame({ title, description, genre, releaseYear, logoUrl });
    res.json(game);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function getGames(req, res) {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function getGameById(req, res) {
  try {
    const game = await gameService.getGameById(req.params.id);
    res.json(game);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function updateGame(req, res) {
  try {
    const updated = await gameService.updateGame(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function deleteGame(req, res) {
  try {
    const deleted = await gameService.deleteGame(req.params.id);
    res.json({ message: 'Jeu supprimé' });
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function deleteAllGames(req, res) {
  try {
    await gameService.deleteAllGames();
    res.json({ message: 'Tous les jeux ont été supprimés' });
  } catch (err) {
    res.json({ message: 'Erreur interne', error: err.message });
  }
}
