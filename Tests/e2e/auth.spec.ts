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
            await page.click('button[type="submit"]');
            
        }

        // Playwright REQUIRES this block to execute a test
        test("Successful User Registration", async ({ page }) => {
            await registerUser(page, 'John Doe', 'newuser@techmart.com', 'SecurePass123!');
            await expect(page).toHaveURL('http://localhost:3000/register.html');
        });

    });


    test.describe("Login Tests", () => {

        // Helper login function
        async function loginUser(
            page: Page, 
            email: string, 
            password: string
        ) {
            await page.goto('http://localhost:3000/login.html');
            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.click('button[type="submit"]');
        }

        test("Successful User Login", async ({ page }) => {
            await loginUser(page, 'newuser@techmart.com', 'SecurePass123!');
            await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
        });

    });

});