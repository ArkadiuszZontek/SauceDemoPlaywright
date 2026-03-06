import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

let loginPage: LoginPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate();
});

test.describe('Login elements visible', () => {
    test('Testing if all the expected login page elements are visible', async () => {
        await loginPage.assertPageVisible(true);
    });
});