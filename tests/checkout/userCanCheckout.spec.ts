import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutClientInfoPage } from '../../pages/checkout.clientInfo.page';
import { CheckoutOverviewPage } from '../../pages/checkout.overview.page';
import { CheckoutCompletePage } from '../../pages/checkout.complete.page';
import { TopNavigationPage } from '../../pages/topNavigation.page';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutClientInfoPage: CheckoutClientInfoPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let checkoutCompletePage: CheckoutCompletePage;
let topNavigationPage: TopNavigationPage;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutClientInfoPage = new CheckoutClientInfoPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    topNavigationPage = new TopNavigationPage(page);
    await loginPage.login();
    await inventoryPage.assertPageVisible();
});

test.describe('User can checkout', () => {
    test('Testing if a user can successfully checkout with one item in the cart', async () => {
        await inventoryPage.addItemToCart();
        await topNavigationPage.staticElements.cartButton.click();
        await cartPage.assertPageVisible();
        await cartPage.assertNumberOfItemsInCart(1);
        await cartPage.staticElements.checkoutButton.click();
        await checkoutClientInfoPage.assertPageVisible();
        await checkoutClientInfoPage.fillInClientInformation('Test', 'Client', 'T35T C0D3');
        await checkoutOverviewPage.assertPageVisible();
        await checkoutOverviewPage.finishCheckout();
        await checkoutCompletePage.assertPageVisible(true);
    });
});
