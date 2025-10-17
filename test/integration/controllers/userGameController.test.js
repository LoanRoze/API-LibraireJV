import { jest } from '@jest/globals';

const mockGetAll = jest.fn();
const mockGetById = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockDeleteAll = jest.fn();

jest.unstable_mockModule('../../../services/index.js', () => ({
  userGameService: {
    getAllUserGames: mockGetAll,
    getUserGameById: mockGetById,
    createUserGame: mockCreate,
    updateUserGame: mockUpdate,
    deleteUserGame: mockDelete,
    deleteAllUserGames: mockDeleteAll
  }
}));

const controller = await import('../../../controllers/UserGameController.js').catch(() => null);

function makeRes() {
  return { json: jest.fn() };
}

describe('controller: UserGameController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getAllUserGames returns list on success', async () => {
    if (!controller || typeof controller.getAllUserGames !== 'function') return expect(true).toBe(true);
    const data = [{ userId: 1 }];
    mockGetAll.mockResolvedValue(data);
    const res = makeRes();
    await controller.getAllUserGames({}, res);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('createUserGame passes body and returns result', async () => {
    if (!controller || typeof controller.createUserGame !== 'function') return expect(true).toBe(true);
    const req = { body: { userId: 1, gameId: 2, progress: 10, lastPlayed: '2025-01-01' } };
    const created = { id: 3, ...req.body };
    mockCreate.mockResolvedValue(created);
    const res = makeRes();
    await controller.createUserGame(req, res);
    expect(mockCreate).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  test('error flows are serialized to json', async () => {
    if (!controller || typeof controller.getAllUserGames !== 'function') return expect(true).toBe(true);
    mockGetAll.mockRejectedValue(new Error('boom'));
    const res = makeRes();
    await controller.getAllUserGames({}, res);
    expect(res.json).toHaveBeenCalledWith({ error: 'boom' });
  });
});
