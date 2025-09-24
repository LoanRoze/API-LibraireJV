import * as gameService from '../services/gameService.js';

export async function createGame(req, res) {
  try {
    const { title, genre } = req.body;
    if (!title || !genre) return res.status(400).json({ message: 'Titre et genre requis' });

    const game = await gameService.createGame({ title, genre });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function getGames(req, res) {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function getGameById(req, res) {
  try {
    const game = await gameService.getGameById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function updateGame(req, res) {
  try {
    const updated = await gameService.updateGame(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function deleteGame(req, res) {
  try {
    const deleted = await gameService.deleteGame(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Jeu introuvable' });
    res.json({ message: 'Jeu supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function deleteAllGames(req, res) {
  try {
    await gameService.deleteAllGames();
    res.json({ message: 'Tous les jeux ont été supprimés' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur interne', error: err.message });
  }
}
