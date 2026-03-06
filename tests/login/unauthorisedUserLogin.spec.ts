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

test.describe('Locked out user login', () => {
    test('Testing if a locked out user cannot login to the app and if the error message is displayed', async () => {
        await loginPage.login(process.env.LOCKED_USER_NAME, process.env.LOCKED_USER_PASSWORD);
        await expect(loginPage.dynamicElements.lockedOutError).toBeVisible();
        await expect(inventoryPage.staticElements.pageTitle).not.toBeVisible();
    });
});