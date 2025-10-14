import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js'
import { Game } from '../models/index.js';

export async function createGame({ title, description, genre, releaseYear, logoUrl }) {
  if (!title || !description || !genre || !releaseYear || !logoUrl) {
    console.log({ title, description, genre, releaseYear, logoUrl })
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await Game.getGameByTitle(title)
  if (existing) {
    throw new ConflictError(`Le jeu "${title}" existe déjà`)
  }

  const game = await Game.createGame({ title, description, genre, releaseYear, logoUrl })
  return game.dataValues;
}

export async function getAllGames() {
  const games = await Game.getAllRoles();
  const formattedGames = games.map((game) => {
    return {
      title: game.title,
      description: game.description,
      genre: game.genre,
      releaseYear: game.releaseYear,
      logoUrl: game.logoUrl
    }
  })
  return formattedGames
}

export async function getGameById(id) {
  const game = await Game.getGameById(id)
  if (!game) {
    throw new NotFoundError('Jeu non trouvé')
  }
  return {
    title: game.title,
    description: game.description,
    genre: game.genre,
    releaseYear: game.releaseYear,
    logoUrl: game.logoUrl
  };
}

export async function updateGame(id, { title, description, genre, releaseYear, logoUrl }) {
  if (!title || !description || !genre || !releaseYear || !logoUrl) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await Game.getRoleByName(title);
  if (existing) {
    throw new ConflictError(`Le jeu "${title}" existe déjà`);
  }
  const game = await Game.getRoleById(id)
  if (!game) {
    throw new NotFoundError("Le jeu n'existe pas")
  }

  const updatedGame = await Game.updateGame(id, { title, description, genre, releaseYear, logoUrl });
  return updatedGame.dataValues;
}

export async function deleteGame(id) {
  const game = await Game.getGameById(id);
  if (!game) throw new NotFoundError('Jeu non trouvé');

  return await Game.deleteGame(id);
}

export async function deleteAllGames() {
    return await Game.deleteAllGamesAndResetIndex();
}
