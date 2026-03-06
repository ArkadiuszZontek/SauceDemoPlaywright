import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutClientInfoPage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/checkout-step-one.html';
    this.staticElements = {
        pageTitle: this.page.getByTestId('title').and(this.page.getByText('Checkout: Your Information')),
        firstNameInput: this.page.getByTestId('firstName'),
        lastNameInput: this.page.getByTestId('lastName'),
        postalCodeInput: this.page.getByTestId('postalCode'),
        cancelButton: this.page.getByTestId('cancel'),
        continueButton: this.page.getByTestId('continue'),
    }
  }

  async fillInClientInformation(firstName: string, lastName: string, postalCode: string){
    await this.staticElements.firstNameInput.fill(firstName);
    await this.staticElements.lastNameInput.fill(lastName);
    await this.staticElements.postalCodeInput.fill(postalCode);
    await this.staticElements.continueButton.click();
  }

  async assertPageVisible(checkAllElements?: boolean, visible: boolean = true){
    if(!checkAllElements){
      await expect(this.staticElements.pageTitle).toBeVisible({ visible: visible });
    } else {
        for (const element of Object.values(this.staticElements)) {
          await element.scrollIntoViewIfNeeded();
          await expect(element).toBeVisible({ visible: visible });
        }
    }
  }
}