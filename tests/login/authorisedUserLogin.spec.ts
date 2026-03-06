import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
});

test.describe('Authorised user login', () => {
    test('Testing if a user with valid credentials can successfully login to the app', async () => {
        await loginPage.login();
        await expect(inventoryPage.staticElements.pageTitle).toBeVisible();
    });
});
