# SauceDemoPlaywright

Playwright Test Automation Project covering several test cases for [SauceDemo.com](https://www.saucedemo.com)
Please be aware that 1 test is failing due to a website bug where a user can proceed with the checkout without having any items in the cart.

## Setup Instructions

1. Start by cloning the repo and installing the dependencies:
```bash
npm install
```

2. Duplicate the "example.env" file and rename it to ".env". This file contains mock login and password details for the test website.

## Run tests

- To run tests in a headless browser mode, run:
```bash
npx playwright test
```

- Example of how to run one test only:
```bash
npx playwright test tests/login/loginElementsVisible.spec.ts
```

- To run the test with Open testing UI:
```bash
npx playwright test --ui
```

## To Do

1. Add extra tests covering the checkout process:
  - Testing if the price is calculated at various stages of the checkout process
  - Testing if the user cannot proceed through various stages of the checkout process without providing the necessary information
  - Testing if the correct items are added to the cart, and if they can be removed
  - Testing if all expected elements on each checkout page are visible
  - Testing if all navigation buttons at various stages of the checkout are navigating users to the right page

2. Add extra tests covering the inventory page:
  - Testing if the correct images, titles, and descriptions are displayed for the inventory page
  - Testing if all expected elements on the inventory page are visible
  - Testing if the products can be sorted, and if the order they are displayed in matches the sorting option
  
3. Add tests covering all navigation and footer functionality and links:
  - Testing if the user can log out of the app
  - Testing if the user can successfully reset the app state
  - Testing if the user can navigate to the homepage from the side navigation
  - Testing if the social media buttons navigate user to the right social media accounts
