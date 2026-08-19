import { test, expect, Page } from '@playwright/test';

/* 
    AUTHENTICATION TESTS
*/

test.describe("Authentication Tests", () => {

    test.describe("Registration Tests", () => {

        
        async function registerUser(
            page: Page, 
            username: string, 
            email: string, 
            password: string
        ) {
            // Updated to local development server URL
            await page.goto('http://localhost:3000/register.html');
            await page.fill('#username', 'John Doe');
            await page.fill('#email', 'newuser@techmart.com');
            await page.fill('#password',  'SecurePass123!');
            await page.fill('#confirm-password', 'SecurePass123!');
            await page.click('#register-button');

            await page.waitForSelector('#success-message');
            // Verify that the success message is displayed
            const successMessage = await page.textContent('#success-message');
            expect(successMessage).toContain('Registration successful');
            // Verify that the user is redirected to the home page after successful registration
            await expect(page).toHaveURL('http://localhost:3000/home.html');
        }

        

    });


    test.describe("Login Tests", () => {

        async function loginUser(page: Page, email: string, password: string) {
            // Updated to local development server URL
            await page.goto('http://localhost:3000/login.html');
            await page.fill('#email', email);
            await page.fill('#password', password);
            await page.click('#login-button');
        }   
    });

});