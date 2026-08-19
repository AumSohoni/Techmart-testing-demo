import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage — page object for /login.html
 *
 * Locators are derived from the actual login.html markup:
 *   - <input id="email"> with <label for="email">Email Address</label>
 *   - <input id="password"> with <label for="password">Password</label>
 *   - <button type="submit">Login</button>
 *   - <a href="/register.html">Sign up here</a>
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.registerLink = page.getByRole('link', { name: /sign up here/i });
  }

  /** Navigate to the login page. */
  async navigate(): Promise<void> {
    await super.navigate('/login.html');
  }

  /** Fill credentials and submit the login form. */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Login and wait until we're redirected to the home page. */
  async loginAndWaitForRedirect(email: string, password: string): Promise<void> {
    await this.login(email, password);
    await this.page.waitForURL('**/');
  }

  /** Click the "Sign up here" link to go to registration. */
  async clickRegisterLink(): Promise<void> {
    await this.registerLink.click();
  }

  /** Check whether the login form is visible on the page. */
  async isLoginFormVisible(): Promise<boolean> {
    return this.loginButton.isVisible();
  }
}
