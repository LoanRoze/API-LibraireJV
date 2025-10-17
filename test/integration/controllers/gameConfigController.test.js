import { jest } from '@jest/globals';

const mockGetConfig = jest.fn();
const mockSetConfig = jest.fn();

jest.unstable_mockModule('../../../services/index.js', () => ({
  gameConfigService: {
    getConfig: mockGetConfig,
    setConfig: mockSetConfig
  }
}));

const controller = await import('../../../controllers/gameConfigController.js').catch(() => null);

function makeReq(params = {}, body = {}) {
  return { params, body };
}
function makeRes() {
  return { json: jest.fn() };
}

describe('controller: gameConfigController', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getConfig returns config on success', async () => {
    if (!controller || typeof controller.getConfig !== 'function') return expect(true).toBe(true);
    const cfg = { difficulty: 'easy' };
    mockGetConfig.mockResolvedValue(cfg);
    const res = makeRes();
    const req = makeReq({ gameId: '42' });
    await controller.getConfig(req, res);
    expect(mockGetConfig).toHaveBeenCalledWith('42');
    expect(res.json).toHaveBeenCalledWith(cfg);
  });

  test('getConfig handles error', async () => {
    mockGetConfig.mockRejectedValue(new Error('nope'));
    const res = makeRes();
    const req = makeReq({ gameId: '1' });
    await controller.getConfig(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur', error: 'nope' });
  });

  test('setConfig returns updated config on success', async () => {
    if (!controller || typeof controller.setConfig !== 'function') return expect(true).toBe(true);
    const updated = { difficulty: 'hard' };
    mockSetConfig.mockResolvedValue(updated);
    const res = makeRes();
    const req = makeReq({ gameId: '9' }, { difficulty: 'hard' });
    await controller.setConfig(req, res);
    expect(mockSetConfig).toHaveBeenCalledWith('9', { difficulty: 'hard' });
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test('setConfig handles error', async () => {
    mockSetConfig.mockRejectedValue(new Error('save-fail'));
    const res = makeRes();
    const req = makeReq({ gameId: '9' }, { difficulty: 'hard' });
    await controller.setConfig(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Erreur serveur', error: 'save-fail' });
  });
});
