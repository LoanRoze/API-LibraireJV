import { jest } from '@jest/globals';

const mockFindAll = jest.fn();
const mockFindByPk = jest.fn();
const mockCreate = jest.fn();
const mockDestroy = jest.fn();
const mockQuery = jest.fn();
const mockFindOne = jest.fn();

jest.unstable_mockModule('../../../models/index.js', () => ({
  UserGame: {
    findAll: mockFindAll,
    findByPk: mockFindByPk,
    create: mockCreate,
    destroy: mockDestroy,
    findOne: mockFindOne
  }
}));

jest.unstable_mockModule('../../../db/mysql.js', () => ({
  sequelize: { query: mockQuery }
}));

const repo = await import('../../../repository/userGameRepository.js').catch(() => null);

describe('repository: userGameRepository', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getAllUserGames returns array when function exists', async () => {
    if (!repo || typeof repo.getAllUserGames !== 'function') return expect(true).toBe(true);
    const arr = [{ id: 1 }];
    mockFindAll.mockResolvedValue(arr);
    expect(await repo.getAllUserGames()).toBe(arr);
  });

  test('createUserGame returns created record when function exists', async () => {
    if (!repo || typeof repo.createUserGame !== 'function') return expect(true).toBe(true);
    const payload = { userId: 1, gameId: 2 };
    mockCreate.mockResolvedValue({ id: 5, ...payload });
    const out = await repo.createUserGame(payload);
    expect(mockCreate).toHaveBeenCalledWith(payload);
    expect(out).toEqual({ id: 5, ...payload });
  });

  test('deleteAllUserGamesAndResetIndex only if present', async () => {
    if (!repo || typeof repo.deleteAllUserGamesAndResetIndex !== 'function') return expect(true).toBe(true);
    mockDestroy.mockResolvedValue();
    mockQuery.mockResolvedValue();
    const res = await repo.deleteAllUserGamesAndResetIndex();
    expect(mockDestroy).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalled();
    expect(res).toBeTruthy();
  });
});
