import { User } from './User.js';
import { Role } from './Role.js';
import { UserRole } from './UserRole.js';
import { Game } from './Game.js';
import { UserGame } from './UserGame.js';

// Associations SQL
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

UserRole.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserRole.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// UserGame associations
User.belongsToMany(Game, { through: UserGame, foreignKey: 'userId', otherKey: 'gameId', as: 'games' });
Game.belongsToMany(User, { through: UserGame, foreignKey: 'gameId', otherKey: 'userId', as: 'users' });

UserGame.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserGame.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });

export { User, Role, UserRole, Game, UserGame };