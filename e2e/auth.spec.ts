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
            await page.fill('#username', username);
            await page.fill('#email', email);
            await page.fill('#password', password);
            await page.fill('#confirm-password', password);
            await page.click('#register-button');
            await page.waitForSelector('#success-message');
        }

        
        test("Successful User Registration", async ({ page }) => {
            await registerUser(page, 'John Doe', 'newuser@techmart.com', 'SecurePass123!');
            await expect(page.locator('#success-message')).toBeVisible();
        });

    });

});