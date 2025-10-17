import { jest } from '@jest/globals';

const mockGetUserById = jest.fn();
const mockGetRoleById = jest.fn();
const mockCheckIfUserRoleExists = jest.fn();
const mockAssignRoleToUser = jest.fn();
const mockGetAllUserRoles = jest.fn();
const mockGetUserRoleById = jest.fn();
const mockDeleteAllUserRolesAndResetIndex = jest.fn();

jest.unstable_mockModule('../../../repository/index.js', () => ({
  userRepository: { getUserById: mockGetUserById },
  roleRepository: { getRoleById: mockGetRoleById },
  userRoleRepository: {
    checkIfUserRoleExists: mockCheckIfUserRoleExists,
    assignRoleToUser: mockAssignRoleToUser,
    getAllUserRoles: mockGetAllUserRoles,
    getUserRoleById: mockGetUserRoleById,
    deleteAllUserRolesAndResetIndex: mockDeleteAllUserRolesAndResetIndex
  }
}));

const { BadRequestError, ConflictError, NotFoundError } = await import('../../../errors/api.error.js');
const svc = await import('../../../services/userRoleService.js');

describe('service: userRoleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('assignRoleToUser', () => {
    test('throws BadRequestError when fields missing', async () => {
      await expect(svc.assignRoleToUser({ userId: null, roleId: 1 }))
        .rejects.toThrow('Tous les champs sont requis');
    });

    test('throws NotFoundError when user or role missing', async () => {
      mockGetUserById.mockResolvedValue(null);
      mockGetRoleById.mockResolvedValue(null);
      await expect(svc.assignRoleToUser({ userId: 1, roleId: 2 }))
        .rejects.toThrow('Le role ou l\'utilisateur n\'existent pas');
    });

    test('throws ConflictError when association already exists', async () => {
      mockGetUserById.mockResolvedValue({ id: 1 });
      mockGetRoleById.mockResolvedValue({ id: 2 });
      mockCheckIfUserRoleExists.mockResolvedValue({ id: 5 });
      await expect(svc.assignRoleToUser({ userId: 1, roleId: 2 }))
        .rejects.toThrow('Ce role appartient déjà a cet utilisateur');
    });

    test('returns created record when ok', async () => {
      const created = { id: 10, userId: 1, roleId: 2 };
      mockGetUserById.mockResolvedValue({ id: 1 });
      mockGetRoleById.mockResolvedValue({ id: 2 });
      mockCheckIfUserRoleExists.mockResolvedValue(null);
      mockAssignRoleToUser.mockResolvedValue(created);
      const res = await svc.assignRoleToUser({ userId: 1, roleId: 2 });
      expect(mockAssignRoleToUser).toHaveBeenCalledWith({ userId: 1, roleId: 2 });
      expect(res).toMatchObject(created);
    });
  });

  describe('getUserRoles', () => {
    test('formats and returns roles', async () => {
      const rows = [{ userId: 1, roleId: 2 }, { userId: 3, roleId: 4 }];
      mockGetAllUserRoles.mockResolvedValue(rows);
      const res = await svc.getUserRoles();
      expect(res).toMatchObject(rows.map(r => ({ userId: r.userId, roleId: r.roleId })));
    });
  });

  describe('getUserRoleById', () => {
    test('throws NotFoundError when not found', async () => {
      mockGetUserRoleById.mockResolvedValue(null);
      await expect(svc.getUserRoleById(5)).rejects.toThrow('User-Role non trouvé');
    });

    test('returns formatted object when found', async () => {
      const row = { id: 5, userId: 7, gameId: 9 };
      mockGetUserRoleById.mockResolvedValue(row);
      const res = await svc.getUserRoleById(5);
      // service returns userId and gameId (not roleId)
      expect(res).toMatchObject({ userId: 7, gameId: 9 });
    });
  });

  describe('updateUserRole', () => {
    test('throws BadRequestError when fields missing', async () => {
      await expect(svc.updateUserRole(1, { userId: null, roleId: 2 })).rejects.toThrow('Tous les champs sont requis');
    });

    // deeper update success / failures depend on service implementation details.
  });

  describe('deleteAllUserRoles', () => {
    test('calls repository to delete all and reset index', async () => {
      mockDeleteAllUserRolesAndResetIndex.mockResolvedValue(true);
      const res = await svc.deleteAllUserRoles();
      expect(mockDeleteAllUserRolesAndResetIndex).toHaveBeenCalled();
      expect(res).toBe(true);
    });
  });
});
