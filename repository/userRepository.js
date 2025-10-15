import { User } from "../models/index.js";
import { sequelize } from '../db/mysql.js';


export async function createUser({ username, email, password }) {
  return await User.create({ username, email, password });
}

export async function getUserById(id) {
  return await User.findByPk(id);
}

export async function getUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function getAllUsers() {
  return await User.findAll()
}

export async function updateUser(id, payload) {
  const user = await getUserById(id);
  if (!user) return null;
  return await user.update(payload);
}

export async function deleteUser(id) {
  const user = await getUserById(id);
  if (!user) return null;
  await user.destroy();
  return true;
}

export async function deleteAllUsersAndResetIndex() {
  await User.destroy({ truncate: { cascade: false } });
  await sequelize.query("ALTER TABLE users AUTO_INCREMENT = 1;");
  return true;
}
