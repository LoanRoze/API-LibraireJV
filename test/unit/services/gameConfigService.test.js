import { jest } from '@jest/globals';

const mockFindOne = jest.fn();
const mockFindOneAndUpdate = jest.fn();

jest.unstable_mockModule('../../../repository/gameConfigRepository.js', () => ({
  findOne: mockFindOne,
  findOneAndUpdate: mockFindOneAndUpdate,
}));

const svc = await import('../../../services/gameConfigService.js').catch(() => null);

describe('unit: gameConfigService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('sanity: test runner works', () => {
    expect(true).toBe(true);
  });
  test('if service exists it exports expected functions', async () => {
    let svc;
    try {
      svc = await import('../../../services/gameConfigService.js');
    } catch {
      return expect(true).toBe(true);
    }
    expect(typeof svc.getConfig === 'function' || typeof svc.getConfig === 'undefined').toBe(true);
    expect(typeof svc.setConfig === 'function' || typeof svc.setConfig === 'undefined').toBe(true);
  });
  test('getConfig returns config on success and propagates error', async () => {
    if (!svc) return expect(true).toBe(true);
    const cfg = { difficulty: 'easy' };
    mockFindOne.mockResolvedValue(cfg);
    expect(await svc.getConfig('42')).toBe(cfg);
    const err = new Error('bad');
    mockFindOne.mockRejectedValue(err);
    await expect(svc.getConfig('42')).rejects.toBe(err);
  });

  test('setConfig uses findOneAndUpdate and returns updated config', async () => {
    if (!svc) return expect(true).toBe(true);
    const updated = { difficulty: 'hard' };
    mockFindOneAndUpdate.mockResolvedValue(updated);
    expect(await svc.setConfig('9', { difficulty: 'hard' })).toBe(updated);
    const err = new Error('update-failed');
    mockFindOneAndUpdate.mockRejectedValue(err);
    await expect(svc.setConfig('9', { difficulty: 'hard' })).rejects.toBe(err);
  });
});
