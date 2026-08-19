# Playwright E2E Testing Setup Guide for TechMart

This guide walks you through setting up a professional Playwright test automation project for the TechMart demo app.

---

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- TechMart app running on `http://localhost:3000`
- VS Code with Playwright Test extension (optional)

---

## 🚀 Step 1: Project Setup

### Create Test Directory Structure

From your workspace root:
```bash
cd software-testing-course
New-Item -ItemType Directory -Force Tests/e2e,Tests/pages,Tests/fixtures,Tests/utils
npm init -y
npm install -D @playwright/test @types/node typescript
```

### Initialize TypeScript

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./tests",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["tests/**/*"],
  "exclude": ["node_modules"]
}
```

### Update package.json Scripts

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:auth": "playwright test auth",
    "test:cart": "playwright test cart"
  }
}
```

---

## ⚙️ Step 2: Playwright Configuration

Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

---

## 📄 Step 3: Base Page Object

Create `tests/pages/base.page.ts`:
```typescript
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${path}`);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${filename}.png`,
      fullPage: true 
    });
  }

  async getErrorMessage(): Promise<string | null> {
    const errorElement = this.page.locator('[role="alert"]');
    return await errorElement.isVisible() ? await errorElement.textContent() : null;
  }

  async expectErrorMessage(expectedMessage: string): Promise<void> {
    const errorElement = this.page.locator('[role="alert"]');
    await expect(errorElement).toContainText(expectedMessage);
  }

  async expectSuccessMessage(expectedMessage: string): Promise<void> {
    const successElement = this.page.locator('[role="status"]');
    await expect(successElement).toContainText(expectedMessage);
  }

  async fillForm(fields: Record<string, string>): Promise<void> {
    for (const [fieldName, value] of Object.entries(fields)) {
      await this.page.getByLabel(fieldName).fill(value);
    }
  }
}
```

---

## 🔐 Step 4: Login Page Object

Create `tests/pages/login.page.ts`:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    this.registerLink = page.getByRole('link', { name: /register/i });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot/i });
  }

  async navigate(): Promise<void> {
    await super.navigate('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  async loginAndWaitForDashboard(email: string, password: string): Promise<void> {
    await this.login(email, password);
    await this.page.waitForURL('**/');
  }

  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }
}
```

---

## 📝 Step 5: Registration Page Object

Create `tests/pages/register.page.ts`:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class RegisterPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm Password');
    this.registerButton = page.getByRole('button', { name: /register/i });
    this.loginLink = page.getByRole('link', { name: /login/i });
  }

  async navigate(): Promise<void> {
    await super.navigate('/register');
  }

  async register(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
    await this.waitForPageLoad();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }
}
```

---

## 🛒 Step 6: Cart Page Object

Create `tests/pages/cart.page.ts`:
```typescript
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;
  readonly cartTotal: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    this.cartItems = page.locator('[data-testid="cart-item"]');
    this.cartTotal = page.locator('[data-testid="cart-total"]');
    this.emptyCartMessage = page.locator('text=Your cart is empty');
  }

  async navigate(): Promise<void> {
    await super.navigate('/cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartTotal(): Promise<string> {
    return await this.cartTotal.textContent() ?? '';
  }

  async removeItemByIndex(index: number): Promise<void> {
    const removeButtons = this.page.getByRole('button', { name: /remove/i });
    await removeButtons.nth(index).click();
  }

  async increaseQuantityByIndex(index: number): Promise<void> {
    const plusButtons = this.page.getByRole('button', { name: '+' });
    await plusButtons.nth(index).click();
  }

  async decreaseQuantityByIndex(index: number): Promise<void> {
    const minusButtons = this.page.getByRole('button', { name: '-' });
    await minusButtons.nth(index).click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForPageLoad();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  async expectCartItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }
}
```

---

## 🏠 Step 7: Home/Products Page Object

Create `tests/pages/products.page.ts`:
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly products: Locator;
  readonly addToCartButtons: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly categoryFilter: Locator;
  readonly priceFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.products = page.locator('[data-testid="product-card"]');
    this.addToCartButtons = page.getByRole('button', { name: /add to cart/i });
    this.searchBox = page.getByPlaceholder(/search/i);
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.categoryFilter = page.locator('[data-testid="category-filter"]');
    this.priceFilter = page.locator('[data-testid="price-filter"]');
  }

  async navigate(): Promise<void> {
    await super.navigate('/');
  }

  async getProductCount(): Promise<number> {
    return await this.products.count();
  }

  async addToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  async addToCartByName(productName: string): Promise<void> {
    const product = this.page.locator(`[data-testid="product-card"]:has-text("${productName}")`);
    await product.locator('button:has-text("Add to Cart")').click();
  }

  async searchProducts(query: string): Promise<void> {
    await this.searchBox.fill(query);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category);
    await this.waitForPageLoad();
  }

  async getProductNames(): Promise<string[]> {
    return await this.products.allTextContents();
  }
}
```

---

## 🔧 Step 8: Fixtures for Authentication

Create `tests/fixtures/auth.fixture.ts`:
```typescript
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('demo@techmart.com', 'demo123');
    
    // Verify login successful
    await expect(page).toHaveURL('**/');
    
    // Test runs here with authenticated user
    await use(page);
    
    // Teardown: Clear session
    await page.context().clearCookies();
  },
});

export { expect };
```

---

## 📝 Step 9: Test Utilities

Create `tests/utils/test-data.ts`:
```typescript
export const TEST_DATA = {
  validUser: {
    email: 'demo@techmart.com',
    password: 'demo123',
    name: 'Demo User'
  },
  newUser: {
    email: `user_${Date.now()}@test.com`,
    password: 'SecurePass123!',
    name: 'New Test User'
  },
  invalidCredentials: {
    email: 'invalid@test.com',
    password: 'wrongpassword'
  },
  testProducts: {
    headphones: 'Wireless Headphones',
    keyboard: 'Mechanical Keyboard',
    hub: 'USB-C Hub'
  }
};

export class TestDataGenerator {
  static generateEmail(): string {
    return `testuser_${Date.now()}@techmart.test`;
  }

  static generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
```

---

## ✅ Step 10: Your First Test Suite

Create `tests/e2e/auth/login.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Authentication - Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Arrange
    const validUser = TEST_DATA.validUser;

    // Act
    await loginPage.login(validUser.email, validUser.password);

    // Assert
    await expect(page).toHaveURL('**/');
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('should show error with invalid password', async ({ page }) => {
    // Arrange
    const email = TEST_DATA.validUser.email;
    const wrongPassword = 'wrongpassword123';

    // Act
    await loginPage.login(email, wrongPassword);

    // Assert
    await expect(page.locator('[role="alert"]')).toContainText('Invalid email or password');
    await expect(page).toHaveURL('**/login');
  });

  test('should show error with non-existent email', async ({ page }) => {
    // Act
    await loginPage.login('nonexistent@test.com', 'anypassword');

    // Assert
    await expect(page.locator('[role="alert"]')).toContainText('Invalid email or password');
  });

  test('should show error when email field is empty', async ({ page }) => {
    // Act
    await loginPage.passwordInput.fill('password');
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator('[role="alert"]')).toContainText('Email is required');
  });

  test('should show error when password field is empty', async ({ page }) => {
    // Act
    await loginPage.emailInput.fill(TEST_DATA.validUser.email);
    await loginPage.loginButton.click();

    // Assert
    await expect(page.locator('[role="alert"]')).toContainText('Password is required');
  });

  test('should navigate to registration page', async ({ page }) => {
    // Act
    await loginPage.clickRegisterLink();

    // Assert
    await expect(page).toHaveURL('**/register');
  });
});
```

---

## 🛒 Step 11: Cart Test Suite

Create `tests/e2e/cart/add-to-cart.spec.ts`:
```typescript
import { test, expect } from '../../fixtures/auth.fixture';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { TEST_DATA } from '../../utils/test-data';

test.describe('Shopping Cart - Add to Cart', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    productsPage = new ProductsPage(authenticatedPage);
    cartPage = new CartPage(authenticatedPage);
    await productsPage.navigate();
  });

  test('should add single item to cart', async ({ authenticatedPage }) => {
    // Act
    await productsPage.addToCartByIndex(0);
    
    // Assert
    await expect(authenticatedPage.locator('text=Item added to cart')).toBeVisible();
    
    // Verify cart count updated
    const cartBadge = authenticatedPage.locator('[data-testid="cart-badge"]');
    await expect(cartBadge).toContainText('1');
  });

  test('should add multiple items to cart', async ({ authenticatedPage }) => {
    // Act
    await productsPage.addToCartByIndex(0); // Headphones
    await authenticatedPage.waitForTimeout(500); // Small delay
    await productsPage.addToCartByIndex(1); // Keyboard
    
    // Assert
    const cartBadge = authenticatedPage.locator('[data-testid="cart-badge"]');
    await expect(cartBadge).toContainText('2');
  });

  test('should display correct product in cart', async ({ authenticatedPage }) => {
    // Act
    const productName = TEST_DATA.testProducts.headphones;
    await productsPage.addToCartByName(productName);
    await cartPage.navigate();

    // Assert
    await expect(authenticatedPage.locator(`text=${productName}`)).toBeVisible();
  });
});
```

---

## 🚀 Running Your Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
```

### Run Tests Headed (See Browser)
```bash
npm run test:headed
```

### Run Specific Test File
```bash
npm test auth/login.spec.ts
```

### Run in Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run test:report
```

---

## 📊 Best Practices Checklist

✅ **Always use Page Objects** - Centralize selectors
✅ **Use resilient selectors** - `getByRole`, `getByLabel`, `getByTestId`
✅ **Keep tests isolated** - No test should depend on another
✅ **Use fixtures** - Share setup/teardown logic
✅ **Clear naming** - Test names should describe what they test
✅ **Add waits** - Use `waitForLoadState`, `waitForURL`
✅ **Document intent** - Use Arrange-Act-Assert pattern
✅ **Single responsibility** - One assertion per behavior
✅ **Handle errors gracefully** - Test error scenarios
✅ **Keep DRY** - Don't repeat test logic

---

## 📚 Next Steps

1. **Run the manual tests first** - Execute MANUAL_TEST_CASES.md manually on TechMart
2. **Create Page Objects** - For each page in your app
3. **Write E2E Tests** - Start with critical user journeys
4. **Add Fixtures** - For common setup (like authentication)
5. **Run in CI/CD** - Integrate with GitHub Actions
6. **Generate Reports** - Track test metrics over time

---

## 🐛 Debugging Tips

**Test fails intermittently?**
- Add explicit waits: `await page.waitForLoadState('networkidle')`
- Use `--debug` flag: `npm run test:debug`
- Check network tab in Playwright Inspector

**Can't find element?**
- Run `npm run test:ui` and use Playwright Inspector
- Verify test ID exists in HTML: `<button data-testid="submit">Submit</button>`
- Check element is visible before clicking

**Test hangs?**
- Set timeout: `test.setTimeout(30000);`
- Add console logs to see where it stops
- Check if element is blocking (modal, overlay)

---

Good luck with your Playwright testing journey! 🎭

---

## Personal Automation Evidence (GitHub-Friendly)

Use this section to show your own execution history with repeatable proof.

### Run Log

| Run ID | Date | Command | Total | Passed | Failed | Duration | Report Path |
|--------|------|---------|-------|--------|--------|----------|-------------|
| AT-001 | YYYY-MM-DD | npm test | 0 | 0 | 0 | 0m 00s | playwright-report/index.html |
| AT-002 | YYYY-MM-DD | npm run test:headed | 0 | 0 | 0 | 0m 00s | playwright-report/index.html |

### Evidence Checklist Per Run

- Commit hash recorded for run
- Terminal output captured
- Playwright HTML report generated
- Failed test screenshots reviewed
- Root cause and fix noted in commit message

### Recommended Commit Pattern

Use one commit per meaningful QA action:

- test(manual): execute auth test cases TC-001 to TC-005
- test(e2e): add login negative path checks
- fix(app): handle empty password validation error
- docs(qa): update execution logs and evidence links

### Reviewer Sign-Off

| Name | Role | Date | Notes |
|------|------|------|-------|
| | QA Automation Engineer | | |
| | Technical Reviewer | | |
