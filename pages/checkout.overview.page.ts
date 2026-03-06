import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/checkout-step-two.html';
    this.staticElements = {
        pageTitle: this.page.getByTestId('title').and(this.page.getByText('Checkout: Overview')),
        quantityLabel: this.page.getByTestId('cart-quantity-label'),
        descriptionLabel: this.page.getByTestId('.cart-desc-label'),
        inventoryItem: this.page.getByTestId('inventory-item'),
        shoppingCartBadge: this.page.getByTestId('shopping-cart-badge'),
        paymentInfoLabel: this.page.getByTestId('payment-info-label'),
        paymentinfovalue: this.page.getByTestId('payment-info-value'),
        shippingInfoLabel: this.page.getByTestId('shipping-info-label'),
        shippingInfoValue: this.page.getByTestId('shipping-info-value'),
        totalInfoLabel: this.page.getByTestId('total-info-label'),
        subtotalInfoValue: this.page.getByTestId('subtotal-label'),
        taxLabel: this.page.getByTestId('tax-label'),
        totalLabel: this.page.getByTestId('total-label'),
        cancelButton: this.page.getByTestId('cancel'),
        finishButton: this.page.getByTestId('finish'),
    }
  }

  async finishCheckout(){
    await this.staticElements.finishButton.click();
  }

  async assertPageVisible(checkAllElements?: boolean, visible: boolean = true){
    if(!checkAllElements){
      await expect(this.staticElements.pageTitle).toBeVisible({timeout: 5000, visible: visible});
    } else {
        for (const element of Object.values(this.staticElements)) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toBeVisible({timeout: 5000, visible: visible});
        }
    }
  }

  async assertNumberOfItemsInCart(numberOfItems: number){
    return expect(this.staticElements.inventoryItem.filter({ visible: true })).toHaveCount(numberOfItems);
  }
}