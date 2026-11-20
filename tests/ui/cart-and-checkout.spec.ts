import { test, expect } from '../../fixtures/app';

test.describe('Cart and checkout', () => {
  test('cart badge follows add and remove', async ({ loggedIn }) => {
    await loggedIn.addItem('Sauce Labs Backpack');
    await expect(loggedIn.cartBadge).toHaveText('1');

    await loggedIn.addItem('Sauce Labs Bike Light');
    await expect(loggedIn.cartBadge).toHaveText('2');

    await loggedIn.removeItem('Sauce Labs Backpack');
    await expect(loggedIn.cartBadge).toHaveText('1');
  });

  test('cart lists the chosen items', async ({ loggedIn, cartPage }) => {
    await loggedIn.addItem('Sauce Labs Backpack');
    await loggedIn.addItem('Sauce Labs Onesie');
    await loggedIn.openCart();

    await expect(cartPage.items).toHaveCount(2);
    expect(await cartPage.itemNames()).toEqual(['Sauce Labs Backpack', 'Sauce Labs Onesie']);
  });

  test('completes a purchase', async ({ page, loggedIn, cartPage }) => {
    await loggedIn.addItem('Sauce Labs Backpack');
    await loggedIn.openCart();
    await cartPage.checkoutButton.click();
    await cartPage.fillCheckout('Test', 'User', '12345');
    await cartPage.finish();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

  test('checkout requires a first name', async ({ page, loggedIn, cartPage }) => {
    await loggedIn.addItem('Sauce Labs Backpack');
    await loggedIn.openCart();
    await cartPage.checkoutButton.click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
