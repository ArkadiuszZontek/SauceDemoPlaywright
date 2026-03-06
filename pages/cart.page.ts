import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};
  readonly dynamicElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/cart.html';
    this.staticElements = {
        pageTitle: this.page.getByTestId('title').and(this.page.getByText('Your Cart')),
        quantityLabel: this.page.getByTestId('cart-quantity-label'),
        descriptionLabel: this.page.getByTestId('cart-desc-label'),
        continueShoppingButton: this.page.getByTestId('continue-shopping'),
        checkoutButton: this.page.getByTestId('checkout'),
    }
    this.dynamicElements = {
      inventoryItem: this.page.getByTestId('inventory-item'),
      removeFromCartButton: this.page.getByRole('button').and(this.page.getByText('Remove')),
    }
  }

  assertPageVisible(checkAllElements?: boolean, visible: boolean = true){
    if(!checkAllElements){
      return expect(this.staticElements.pageTitle).toBeVisible({timeout: 5000, visible: visible});
    } else {
        for (const element of Object.values(this.staticElements)) {
          element.scrollIntoViewIfNeeded();
          expect(element).toBeVisible({timeout: 5000, visible: visible});
        }
        return expect(this.dynamicElements.inventoryItem.filter({ visible: true })).toHaveCount(1);
    }
  }

  assertItemInCart(itemName: string){
    const item = this.dynamicElements.inventoryItem.filter({ has: this.page.getByTestId('inventory-item-name').filter({ hasText: itemName }) });
    return expect(item).toBeVisible();
  }

  assertNumberOfItemsInCart(numberOfItems: number){
    return expect(this.dynamicElements.inventoryItem.filter({ visible: true })).toHaveCount(numberOfItems);
  }
}