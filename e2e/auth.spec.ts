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
            await page.fill('#username', 'John Doe');
            await page.fill('#email', 'newuser@techmart.com');
            await page.fill('#password', 'SecurePass123!');
            await page.fill('#confirm-password', 'SecurePass123!');
            await page.click('#register-button');
            await page.waitForSelector('#success-message');
        }

        
      

    });

});