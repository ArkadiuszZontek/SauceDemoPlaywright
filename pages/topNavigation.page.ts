import { type Locator, type Page } from '@playwright/test';

export class TopNavigationPage {
  readonly page: Page;
  readonly staticElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.staticElements = {
        navigationBar: this.page.getByTestId('primary-header'),
        openMenuButton: this.page.getByTestId('open-menu'),
        heading: this.page.locator('.app_logo').getByText('Swag Labs'),
        cartButton: this.page.getByTestId('shopping-cart-link'),
    }
  }
}