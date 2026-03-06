import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly staticElements: {[key: string]: Locator};
  readonly dynamicElements: {[key: string]: Locator};

  constructor(page: Page) {
    this.page = page;
    this.url = '/';
    this.staticElements = {
        loginHeader: this.page.getByText('Swag Labs'),
        emailInput: this.page.getByTestId('username'),
        passwordInput: this.page.getByTestId('password'),
        loginButton: this.page.getByTestId('login-button'),
    }
    this.dynamicElements = {
        lockedOutError: this.page.getByTestId('error').and(this.page.getByText('Epic sadface: Sorry, this user has been locked out.')),
    }
  }

  async login(email?: string, password?: string) {
    this.navigate();
    const emailValue = email || process.env.STANDARD_USER_NAME || '';
    const passwordValue = password || process.env.STANDARD_USER_PASSWORD || '';
    await this.staticElements.emailInput.fill(emailValue);
    await this.staticElements.passwordInput.fill(passwordValue);
    await this.staticElements.loginButton.click();
  }

  async navigate() {
    await this.page.goto(this.url);
    await expect(this.staticElements.loginHeader).toBeVisible();
  }

  async assertPageVisible(checkAllElements?: boolean){
    if(!checkAllElements){
        await expect(this.staticElements.loginHeader).toBeVisible();
    } else {
        for (const element of Object.values(this.staticElements)) {
            await element.scrollIntoViewIfNeeded();
            await expect(element).toBeVisible();
        }
    }
  }

  async assertLockedOutUserError(){
    await expect(this.dynamicElements.lockedOutError).toBeVisible();
  }
}