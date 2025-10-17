import bcrypt from 'bcrypt';
import { userRepository } from '../repository/index.js';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../errors/api.error.js';
import { generateToken } from '../utils/generateToken.js';

// CREATE
export async function register({ username, email, password }) {
  if (!username || !email || !password) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await userRepository.getUserByEmail(email);
  if (existing) {
    throw new ConflictError('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const user = await userRepository.createUser({ username, email, password })
  return user.dataValues
}

export async function login({ email, password }) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError("L'utilisateur avec cet email n'existe pas")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Le mot de passe est incorect')
  }
  const token = generateToken(user)
  return token
}

export async function getUserById(id) {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  return {
    username: user.username,
    email: user.email
  }
}

export async function getUserByEmail(email) {
  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  return {
    username: user.username,
    email: user.email
  }
}

export async function getAllUsers() {
  const users = await userRepository.getAllUsers()
  const formattedUsers = users.map((user) => {
    return {
      username: user.username,
      email: user.email
    }
  })
  return formattedUsers
}

// UPDATE
export async function updateUser(id, { username, email, password }) {
  if (!username || !email || !password) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  const existing = await userRepository.getUserByEmail(email);
  if (existing) {
    throw new ConflictError('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const updatedUser = await userRepository.updateUser(id, { username, email, password })
  return updatedUser.dataValues
}

// DELETE
export async function deleteUser(id) {
  const user = await userRepository.getUserById(id);
  if (!user) throw new NotFoundError('Utilisateur non trouvé');

  return await userRepository.deleteUser(id);
}

export async function deleteAllUsers() {
  return await userRepository.deleteAllUsersAndResetIndex();
}

