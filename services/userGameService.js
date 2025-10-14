import { User, Game, UserGame } from '../models/index.js';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js';

export async function createUserGame({ userId, gameId }) {
  if (!userId || !gameId) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await User.getUserById(userId)
  const game = await Game.getUserById(gameId)
  if (!user || !game) {
    throw new NotFoundError("Le jeu ou l'utilisateur n'existent pas")
  }
  const existing = await UserGame.checkIfUserGameExists(userId, gameId)
  if (existing) {
    throw new ConflictError("Ce jeu appartient déjà a cet utilisateur")
  }
  return await UserGame.createUserGame({ userId, gameId });
}

export async function getAllUserGames() {
  const userGames = await UserGame.getAllUserGames()
  const formattedUserGames = userGames.map((userGame) => {
    return {
      userId: userGame.userId,
      gameId: userGame.gameId
    }
  })
  return formattedUserGames;
}

export async function getUserGameById(id) {
  const userGame = await UserGame.getUserGameById(id)
  if (!userGame) {
    throw new NotFoundError('User-Game non trouvé')
  }
  return {
    userId: userGame.userId,
    gameId: userGame.gameId
  }
}


export async function updateUserGame(id, { userId, gameId }) {
  if (!userId || !gameId) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await User.getUserById(userId)
  const game = await Game.getUserById(gameId)
  if (!user || !game) {
    throw new NotFoundError("Le jeu ou l'utilisateur n'existent pas")
  }
  const userGame = await userGame.getUserGameById(id);
  if (!userGame) {
    throw new NotFoundError('User-Game non trouvé')
  }
  const existing = await UserGame.checkIfUserGameExists(userId, gameId)
  if (existing) {
    throw new ConflictError("Ce jeu appartient déjà a cet utilisateur")
  }
  return await userGame.updateUserGame(id, { userId, gameId });
}

export async function deleteUserGame(id) {
  const userGame = await userGame.getUserGameById(id);
  if (!userGame) {
    throw new NotFoundError('User-Game non trouvé')
  }
  return await userGame.deleteUserGame();
}

export async function deleteAllUserGames() {
  return await UserGame.deleteAllUserGamesAndResetIndex();
}