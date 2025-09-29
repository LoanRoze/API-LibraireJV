import { User } from '../models/User.js';

export async function register(data) {
  return await User.createUser(data); 
}

export async function login(email) {
  return await User.getUserByEmail(email); 
}

export async function getById(id) {
  return await User.getUserById(id); 
}

export async function getUserById(id) {
  return await User.getUserById(id); 
}

export async function getAllUsers() {
  return await User.getAllUsers(); 
}

export async function findUserByEmail(email) {
  return await User.getUserByEmail(email); 
}

export async function createUser(data) {
  return await User.createUser(data); 
}

export async function updateUser(id, data) {
  return await User.updateUser(id, data); 
}

export async function deleteUser(id) {
  return await User.deleteUser(id); 
}

export async function deleteAllUsers() {
  return await User.destroy({ where: {} });
}
