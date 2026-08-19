import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * RegisterPage — page object for /register.html
 *
 * Locators are derived from the actual register.html markup:
 *   - <input id="name">    with <label for="name">Full Name</label>
 *   - <input id="email">   with <label for="email">Email Address</label>
 *   - <input id="password"> with <label for="password">Password</label>
 *   - <input id="confirmPassword"> with <label for="confirmPassword">Confirm Password</label>
 *   - <button type="submit">Create Account</button>
 *   - <a href="/login.html">Login here</a>
 */
export class RegisterPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#confirmPassword');
    this.registerButton = page.locator('button[type="submit"]');
    this.loginLink = page.getByRole('link', { name: /login here/i });
  }

  /** Navigate to the registration page. */
  async navigate(): Promise<void> {
    await super.navigate('/register.html');
  }

  /** Fill all fields and submit the registration form. */
  async register(name: string, email: string, password: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }

  /** Fill name only. */
  async fillName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  /** Fill email only. */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /** Fill password only. */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /** Fill confirm-password only. */
  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  /** Click "Login here" link to go to the login page. */
  async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }
}
