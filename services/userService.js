import { User } from '../models/User.js';

export async function register(data) {
  return await User.create(data);
}

export async function login(email) {
  return await User.findOne({ where: { email } });
}

export async function getById(id) {
  return await User.findByPk(id);
}

export async function getUserById(id) {
  return await User.findByPk(id);
}

// Add missing functions
export async function getAllUsers() {
  return await User.findAll();
}

export async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function createUser(data) {
  return await User.create(data);
}

export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
}

export async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

export async function deleteAllUsers() {
  return await User.destroy({ where: {} });
}
