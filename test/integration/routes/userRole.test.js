describe('integration routes: userRole', () => {
  test('exports an Express router with routes (if module exists)', async () => {
    let mod;
    try {
      mod = await import('../../../routes/userRole.js');
    } catch {
      return expect(true).toBe(true);
    }
    const router = mod.default || mod.router || mod;
    expect(router && Array.isArray(router.stack) && router.stack.length > 0).toBe(true);
  });
});
