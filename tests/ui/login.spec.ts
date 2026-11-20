import { test, expect } from '../../fixtures/app';

const invalidLogins = [
  { name: 'wrong password', user: 'standard_user', pass: 'wrong_password', message: 'do not match' },
  { name: 'locked out user', user: 'locked_out_user', pass: 'secret_sauce', message: 'locked out' },
  { name: 'empty username', user: '', pass: 'secret_sauce', message: 'Username is required' },
  { name: 'empty password', user: 'standard_user', pass: '', message: 'Password is required' },
];

test.describe('Login', () => {
  test('valid user reaches the products page', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(6);
  });

  for (const c of invalidLogins) {
    test(`rejects ${c.name}`, async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login(c.user, c.pass);

      await expect(loginPage.error).toContainText(c.message);
    });
  }
});
