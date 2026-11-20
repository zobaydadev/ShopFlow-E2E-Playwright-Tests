import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortSelect: Locator;
  readonly prices: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.prices = page.locator('.inventory_item_price');
  }

  async addItem(name: string) {
    const card = this.items.filter({ hasText: name });
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItem(name: string) {
    const card = this.items.filter({ hasText: name });
    await card.getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect.selectOption(value);
  }

  async priceValues(): Promise<number[]> {
    const texts = await this.prices.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }
}
