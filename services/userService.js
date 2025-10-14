import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { BadRequestError, ConflictError, NotFoundError } from '../errors/api.error.js';

// CREATE
export async function register({username, email, password}) {
  if (!username || !email || !password) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const existing = await User.getUserByEmail(email);
  if (existing) {
    throw new ConflictError('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const user = await User.createUser({username, email, password})
  return user.dataValues
}

// READ
export async function login(email, password) {
  const user = await User.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    throw new BadRequestError('Mot de passe incorrect')
  }

  return {
    username: user.username,
    email: user.email
  }
}

export async function getUserById(id) {
  const user = await User.getUserById(id);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  return {
    username: user.username,
    email: user.email
  }
}

export async function getUserByEmail(email) {
  const user = await User.getUserByEmail(email);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  return {
    username: user.username,
    email: user.email
  }
}

export async function getAllUsers() {
  const users = await User.getAllUsers()
  const formattedUsers = users.map((user) => {
    return {
      username : user.username,
      email : user.email
    }
  })
  return formattedUsers
}

// UPDATE
export async function updateUser(id, {username, email, password}) {
  if (!username || !email || !password) {
    throw new BadRequestError("Tous les champs sont requis")
  }
  const user = await User.getUserById(id);
  if (!user) {
    throw new NotFoundError('Utilisateur non trouvé');
  }
  const existing = await User.getUserByEmail(email);
  if (existing) {
    throw new ConflictError('Email déjà utilisé');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;

  const updatedUser = await User.updateUser(id, {username, email, password})
  return updatedUser.dataValues
}

// DELETE
export async function deleteUser(id) {
  const user = await User.getUserById(id);
  if (!user) throw new NotFoundError('Utilisateur non trouvé');

  return await User.deleteUser(id);
}

export async function deleteAllUsers() {
  return await User.deleteAllUsersAndResetIndex();
}

