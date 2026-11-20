import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async itemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async fillCheckout(first: string, last: string, zip: string) {
    await this.page.getByPlaceholder('First Name').fill(first);
    await this.page.getByPlaceholder('Last Name').fill(last);
    await this.page.getByPlaceholder('Zip/Postal Code').fill(zip);
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async finish() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }
}
