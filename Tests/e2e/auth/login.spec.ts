import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Authentication — Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // ─── Happy Path ───────────────────────────────────────────

  test('should successfully login with valid credentials', async ({ page }) => {
    // Arrange
    const { email, password } = TEST_DATA.validUser;

    // Act
    await loginPage.login(email, password);

    // Assert — redirected to home page and toast confirms success
    await expect(page).toHaveURL(/\/$/);
    await loginPage.expectToast('Login successful');
  });

  // ─── Negative Paths ───────────────────────────────────────

  test('should show error with invalid password', async () => {
    // Arrange
    const email = TEST_DATA.validUser.email;
    const wrongPassword = 'wrongpassword123';

    // Act
    await loginPage.login(email, wrongPassword);

    // Assert — error message appears, stays on login page
    await loginPage.expectErrorMessage('Invalid credentials');
  });

  test('should show error with non-existent email', async () => {
    // Act
    await loginPage.login('nonexistent@example.com', 'anypassword');

    // Assert
    await loginPage.expectErrorMessage('Invalid credentials');
  });

  test('should not submit when email field is empty', async ({ page }) => {
    // Act — fill only the password, then click login
    await loginPage.passwordInput.fill('somepassword');
    await loginPage.loginButton.click();

    // Assert — browser's native validation prevents submission,
    // so we should still be on the login page.
    await expect(page).toHaveURL(/login/);
  });

  test('should not submit when password field is empty', async ({ page }) => {
    // Act — fill only the email, then click login
    await loginPage.emailInput.fill(TEST_DATA.validUser.email);
    await loginPage.loginButton.click();

    // Assert — browser's native validation prevents submission
    await expect(page).toHaveURL(/login/);
  });

  // ─── Navigation ───────────────────────────────────────────

  test('should navigate to registration page via sign-up link', async ({ page }) => {
    // Act
    await loginPage.clickRegisterLink();

    // Assert
    await expect(page).toHaveURL(/register/);
  });
});
