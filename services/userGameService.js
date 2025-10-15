import { userRepository, gameRepository, userGameRepository } from '../repository/index.js';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js';

export async function createUserGame({ userId, gameId }) {
  if (!userId || !gameId) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await userRepository.getUserById(userId)
  const game = await gameRepository.getUserById(gameId)
  if (!user || !game) {
    throw new NotFoundError("Le jeu ou l'utilisateur n'existent pas")
  }
  const existing = await userGameRepository.checkIfUserGameExists(userId, gameId)
  if (existing) {
    throw new ConflictError("Ce jeu appartient déjà a cet utilisateur")
  }
  return await userGameRepository.createUserGame({ userId, gameId });
}

export async function getAllUserGames() {
  const userGames = await userGameRepository.getAllUserGames()
  const formattedUserGames = userGames.map((userGame) => {
    return {
      userId: userGame.userId,
      gameId: userGame.gameId
    }
  })
  return formattedUserGames;
}

export async function getUserGameById(id) {
  const userGame = await userGameRepository.getUserGameById(id)
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
  const user = await userRepository.getUserById(userId)
  const game = await gameRepository.getUserById(gameId)
  if (!user || !game) {
    throw new NotFoundError("Le jeu ou l'utilisateur n'existent pas")
  }
  const userGame = await userGame.getUserGameById(id);
  if (!userGame) {
    throw new NotFoundError('User-Game non trouvé')
  }
  const existing = await userGameRepository.checkIfUserGameExists(userId, gameId)
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
  return await userGameRepository.deleteAllUserGamesAndResetIndex();
}