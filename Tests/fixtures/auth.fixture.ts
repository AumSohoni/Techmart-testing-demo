import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { TEST_DATA } from '../utils/test-data';

/**
 * Custom fixture that provides an already-authenticated page.
 *
 * Usage in test files:
 *   import { test, expect } from '../../fixtures/auth.fixture';
 *
 *   test('my test', async ({ authenticatedPage }) => {
 *     // authenticatedPage is already logged in as the demo user
 *   });
 */
type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup — log in as the demo user
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(TEST_DATA.validUser.email, TEST_DATA.validUser.password);

    // Wait for redirect after successful login
    await page.waitForURL('**/');

    // Hand the authenticated page to the test
    await use(page);

    // Teardown — clear cookies so the next test starts fresh
    await page.context().clearCookies();
  },
});

export { expect };
