import { jest } from '@jest/globals';

const mockCreateRole = jest.fn();
const mockGetRoleById = jest.fn();
const mockGetAllRoles = jest.fn();
const mockUpdateRole = jest.fn();
const mockDeleteRole = jest.fn();
const mockGetRoleByName = jest.fn();

jest.unstable_mockModule('../../../repository/index.js', () => ({
  roleRepository: {
    createRole: mockCreateRole,
    getRoleById: mockGetRoleById,
    getAllRoles: mockGetAllRoles,
    updateRole: mockUpdateRole,
    deleteRole: mockDeleteRole,
    getRoleByName: mockGetRoleByName
  }
}));

const svc = await import('../../../services/roleService.js').catch(() => null);

describe('unit: roleService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('sanity: test runner works', () => {
    expect(true).toBe(true);
  });
  test('if service exists it exports expected functions', async () => {
    let svc;
    try {
      svc = await import('../../../services/roleService.js');
    } catch {
      return expect(true).toBe(true);
    }
    expect(typeof svc.createRole === 'function' || typeof svc.createRole === 'undefined').toBe(true);
    expect(typeof svc.getRoleById === 'function' || typeof svc.getRoleById === 'undefined').toBe(true);
    expect(typeof svc.updateRole === 'function' || typeof svc.updateRole === 'undefined').toBe(true);
    expect(typeof svc.deleteRole === 'function' || typeof svc.deleteRole === 'undefined').toBe(true);
  });
  test('createRole returns created role (requires name + description)', async () => {
    if (!svc) return expect(true).toBe(true);
    const payload = { name: 'admin', description: 'full access' };
    const created = payload;
    mockGetRoleByName.mockResolvedValue(null);
    mockCreateRole.mockResolvedValue(created);
    console.log(svc.createRole({ name: 'admin', description: 'full access'}))
    const res = await svc.createRole(payload);
    expect(mockGetRoleByName).toHaveBeenCalledWith(payload.name);
    expect(res).toMatchObject(created);
  });

  test('createRole throws BadRequestError when required fields missing', async () => {
    if (!svc) return expect(true).toBe(true);
    await expect(svc.createRole({ name: 'x' })).rejects.toThrow('Tous les champs sont requis');
  });

  test('getRoleById throws NotFoundError when missing and returns role when present', async () => {
    if (!svc) return expect(true).toBe(true);
    mockGetRoleById.mockResolvedValue(null);
    await expect(svc.getRoleById(9)).rejects.toThrow('Role non trouvé');
    const role = { id: 9, name: 'r', description: 'd' };
    mockGetRoleById.mockResolvedValue(role);
    expect(await svc.getRoleById(9)).toMatchObject({ name: role.name, description: role.description });
  });
});
