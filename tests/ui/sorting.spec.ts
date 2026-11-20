import { test, expect } from '../../fixtures/app';

test.describe('Product sorting', () => {
  test('price low to high', async ({ loggedIn }) => {
    await loggedIn.sortBy('lohi');
    const prices = await loggedIn.priceValues();

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('price high to low', async ({ loggedIn }) => {
    await loggedIn.sortBy('hilo');
    const prices = await loggedIn.priceValues();

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('name Z to A', async ({ page, loggedIn }) => {
    await loggedIn.sortBy('za');
    const names = await page.locator('.inventory_item_name').allTextContents();

    expect(names).toEqual([...names].sort().reverse());
  });
});
