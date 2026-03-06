import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};
  readonly dynamicElements: {[key: string]: Locator};
  readonly multipleElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/inventory.html';
    this.staticElements = {
      pageTitle: this.page.getByTestId('title').and(this.page.getByText('Products')),
      productSort: this.page.getByTestId('product_sort_container'),
      inventoryList: this.page.getByTestId('inventory-list'),
    }
    this.dynamicElements = {
      removeFromCartButton: this.page.getByRole('button').and(this.page.getByText('Remove')),
    }
    this.multipleElements = {
      item: this.page.getByTestId('inventory-item'),
      itemName: this.page.getByTestId('inventory-item-name'),
      itemImage: this.page.locator('inventory_item_img'),
      itemDescription: this.page.getByTestId('inventory-item-desc'),
      itemPrice: this.page.getByTestId('inventory-item-price'),
      itemAddToCartButton: this.page.getByRole('button').and(this.page.getByText('Add to Cart')),
    }
  }

  async addItemToCart(specific_item?: string){
    if(!specific_item){
      await this.multipleElements.itemAddToCartButton.first().click();
      await expect(this.multipleElements.item.first().filter({ has: this.dynamicElements.removeFromCartButton })).toBeVisible();
    } else {
      await this.multipleElements.item.filter({ has: this.multipleElements.itemName.filter({ hasText: specific_item }) }).and(this.multipleElements.itemAddToCartButton).click();
      await expect(this.multipleElements.item.filter({ has: this.multipleElements.itemName.filter({ hasText: specific_item }) }).filter({ has: this.dynamicElements.removeFromCartButton })).toBeVisible();
    }
  }

  async assertPageVisible(checkAllElements?: boolean, visible: boolean = true){
    if(!checkAllElements){
      await expect(this.staticElements.pageTitle).toBeVisible({timeout: 5000, visible: visible});
    } else {
        for (const element of Object.values(this.staticElements)) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toBeVisible({timeout: 5000, visible: visible});
        }
        for (const element of Object.values(this.multipleElements)) {
          await expect(element.filter({ visible: true })).toHaveCount(6);
        }
    }
  }
}