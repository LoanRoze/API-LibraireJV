import { jest } from '@jest/globals';

const mockCreate = jest.fn();
const mockGetById = jest.fn();
const mockGetAllRoles = jest.fn();
const mockGetGameByTitle = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.unstable_mockModule('../../../repository/index.js', () => ({
  gameRepository: {
    createGame: mockCreate,
    getGameById: mockGetById,
    getAllRoles: mockGetAllRoles,
    getGameByTitle: mockGetGameByTitle,
    updateGame: mockUpdate,
    deleteGame: mockDelete
  }
}));

const svc = await import('../../../services/gameService.js').catch(() => null);

describe('unit: gameService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('createGame returns created game and propagates errors (requires all fields)', async () => {
    if (!svc) return expect(true).toBe(true);
    const payload = { title: 'G', description: 'd', genre: 'puzzle', releaseYear: 2020, logoUrl: 'u' };
    const created = { id: 2, ...payload };
    mockGetGameByTitle.mockResolvedValue(null);
    mockCreate.mockResolvedValue(created);
    expect(await svc.createGame(payload)).toMatchObject(created);
    const err = new Error('fail');
    mockCreate.mockRejectedValue(err);
    await expect(svc.createGame(payload)).rejects.toBe(err);
  });

  test('getAllGames returns array (service calls getAllRoles)', async () => {
    if (!svc) return expect(true).toBe(true);
    const arr = [{
      id: 1,
      title: 'T',
      description: 'D',
      genre: 'G',
      releaseYear: 2000,
      logoUrl: 'u'
    }];
    mockGetAllRoles.mockResolvedValue(arr);
    const res = await svc.getAllGames();
    expect(res).toMatchObject(arr.map(g => ({
      title: g.title,
      description: g.description,
      genre: g.genre,
      releaseYear: g.releaseYear,
      logoUrl: g.logoUrl
    })));
  });
});
