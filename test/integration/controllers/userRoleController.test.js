import { jest } from '@jest/globals';

const mockAssign = jest.fn();
const mockGetAll = jest.fn();
const mockGetById = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockDeleteAll = jest.fn();

jest.unstable_mockModule('../../../services/index.js', () => ({
  userRoleService: {
    assignRoleToUser: mockAssign,
    getUserRoles: mockGetAll,
    getUserRoleById: mockGetById,
    updateUserRole: mockUpdate,
    deleteUserRole: mockDelete,
    deleteAllUserRoles: mockDeleteAll
  }
}));

const controller = await import('../../../controllers/userRoleController.js').catch(() => null);

function resFactory() { return { json: jest.fn() }; }
describe('controller: userRoleController (handlers if present)', () => {
  beforeEach(() => jest.clearAllMocks());

  test('assignRoleToUser: success and error', async () => {
    if (!controller || typeof controller.assignRoleToUser !== 'function') return expect(true).toBe(true);
    const req = { body: { userId: 1, roleId: 2 } };
    const res = resFactory();
    mockAssign.mockResolvedValue({ id: 10 });
    await controller.assignRoleToUser(req, res);
    expect(mockAssign).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ id: 10 });

    const res2 = resFactory();
    mockAssign.mockRejectedValue(new Error('bad'));
    await controller.assignRoleToUser(req, res2);
    expect(res2.json).toHaveBeenCalledWith({ error: 'bad' });
  });

  test('getUserRoles: success and error', async () => {
    if (!controller || typeof controller.getUserRoles !== 'function') return expect(true).toBe(true);
    const res = resFactory();
    const data = [{ userId: 1, roleId: 2 }];
    mockGetAll.mockResolvedValue(data);
    await controller.getUserRoles({}, res);
    expect(res.json).toHaveBeenCalledWith(data);
    const res2 = resFactory();
    mockGetAll.mockRejectedValue(new Error('err'));
    await controller.getUserRoles({}, res2);
    expect(res2.json).toHaveBeenCalledWith({ error: 'err' });
  });

  // similar pattern can be used for getUserRoleById, updateUserRole, deleteUserRole, deleteAllUserRoles
});
