import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/checkout-complete.html';
    this.staticElements = {
        pageTitle: this.page.getByTestId('title').and(this.page.getByText('Checkout: Complete!')),
        checkoutCompleteIcon: this.page.getByTestId('pony-express'),
        checkoutCompleteHeader: this.page.getByTestId('complete-header').and(this.page.getByText('Thank you for your order!')),
        checkoutCompleteDescription: this.page.getByTestId('complete-text').and(this.page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')),
        backToProductsButton: this.page.getByTestId('back-to-products'),
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
    }
  }
}