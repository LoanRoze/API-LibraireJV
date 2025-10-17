import jwt from 'jsonwebtoken';
import { ForbiddenError, UnauthorizedError } from '../errors/api.error';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey'; // À mettre dans ton .env

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    throw new UnauthorizedError('Token manquant')
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return new ForbiddenError('Token invalide');
    req.user = user;
    next();
  });
}