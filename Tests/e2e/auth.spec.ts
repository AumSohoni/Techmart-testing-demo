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
            await page.goto('/register.html');
            await page.fill('input[name="name"]', username);
            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.fill('input[name="confirmPassword"]', password);
            await page.click('button[type="submit"]');
            
        }

        // Playwright REQUIRES this block to execute a test
        test("Successful User Registration", async ({ page }) => {
            await registerUser(page, 'John Doe', 'newuser@techmart.com', 'SecurePass123!');
            await expect(page).toHaveURL('/register.html');
        });

        test("Failed User Registration with Existing Email", async ({ page }) => {
            await registerUser(page, 'Jane Doe', 'demo@techmart.com', 'AnotherPass123!');
            await expect(page).toHaveURL('  /register.html');
            await expect(page.locator('.error-message')).toHaveText('Email already registered');
        });
        
        test("password Mismatch During Registration", async ({ page }) => {
            await page.goto('/register.html');
            await page.fill('input[name="name"]', 'Alice Smith');
            await page.fill('input[name="email"]', 'alice@techmart.com');               
            await page.fill('input[name="password"]', 'Password123!');
            await page.fill('input[name="confirmPassword"]', 'DifferentPassword123!');
            await page.click('button[type="submit"]');
            await expect(page).toHaveURL('http://register.html');
            await expect(page.locator('.error-message')).toHaveText('Passwords do not match');
        });

       
    });


    test.describe("Login Tests", () => {

        // Helper login function
        async function loginUser(
            page: Page, 
            email: string, 
            password: string
        ) {
            await page.goto('/login.html');
            await page.fill('input[name="email"]', email);
            await page.fill('input[name="password"]', password);
            await page.click('button[type="submit"]');
        }

        test("Successful User Login", async ({ page }) => {
            await loginUser(page, 'demo@techmart.com', 'demo123');
            await expect(page).toHaveURL('/login.html');
        });

        test("Failed User Login with Incorrect Password", async ({ page }) => {
            await loginUser(page, 'demo@techmart.com', 'wrongpassword');
            await expect(page).toHaveURL('/login.html');
        });

        test("Logout Functionality", async ({ page }) => {
            await page.goto('/login.html');
            await loginUser(page, 'demo@techmart.com', 'demo123');
            await page.click('button:text("Logout")');
            await expect(page).toHaveURL('/login.html');
        });

    });

});