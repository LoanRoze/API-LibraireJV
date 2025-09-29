import { BadRequestError } from '../errors/api.error.js';
import * as userService from '../services/userService.js';

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body
    const user = await userService.register({ username, email, password });
    res.json(user);
  } catch (err) {
    next(err)
  }
}

export async function login(req,res,next) {
  try {
    const {email, password} = req.body
    const user = await userService.login({email, password})
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function getUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err)
  }
}

export async function getUserById(req, res, next) {
  try {
    const id = req.params.id
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (err) {
    next(err)
  }
}

export async function getUserByEmail(req, res, next) {
  try {
    const email = req.body.email
    const user = await userService.getUserByEmail(email);
    res.json(user);
  } catch (err) {
    next(err)
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body
    const updatedUser = await userService.updateUser(id, { username, email, password });
    res.json(updatedUser);
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id)
    const deleted = await userService.deleteUser(id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err)
  }
}

export async function deleteAllUsers(req, res, next) {
  try {
    await userService.deleteAllUsers();
    res.json({ message: 'Tous les utilisateurs ont été supprimés' });
  } catch (err) {
    next(err)
  }
}
