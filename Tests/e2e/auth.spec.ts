import { test, expect, Page } from '@playwright/test';

/* 
    AUTHENTICATION TESTS
*/

test.describe("Authentication Tests", () => {

    test.describe("Registration Tests", () => {

        // Helper registration function
        async function registerUser(
            page: Page, 
            username: string, 
            email: string, 
            password: string
        ) {
            await page.goto('http://localhost:3000/register.html');
            await page.fill('input[name="name"]', username);
            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.fill('input[name="confirmPassword"]', password);
            await page.click('button[type="Register"]');
            await page.waitForSelector('#success-message');
        }

        // Playwright REQUIRES this block to execute a test
        test("Successful User Registration", async ({ page }) => {
            await registerUser(page, 'John Doe', 'newuser@techmart.com', 'SecurePass123!');
            await expect(page.locator('#success-message')).toBeVisible();
        });

    });

});