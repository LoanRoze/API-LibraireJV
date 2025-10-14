import { gameConfigService } from '../services/index.js';

export async function getConfig(req, res) {
  try {
    const config = await gameConfigService.getConfig(req.params.gameId);
    res.json(config);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}

export async function setConfig(req, res) {
  try {
    const updated = await gameConfigService.setConfig(req.params.gameId, req.body);
    res.json(updated);
  } catch (err) {
    res.json({ message: 'Erreur serveur', error: err.message });
  }
}
