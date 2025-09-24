import * as gameConfigService from '../services/gameConfigService.js';

export async function getConfig(req, res) {
  try {
    const config = await gameConfigService.getConfig(req.params.gameId);
    if (!config) return res.status(404).json({ message: 'Config introuvable' });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function setConfig(req, res) {
  try {
    const updated = await gameConfigService.setConfig(req.params.gameId, req.body);
    res.status(201).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}
