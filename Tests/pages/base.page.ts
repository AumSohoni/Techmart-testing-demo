import { Page, expect } from '@playwright/test';

/**
 * BasePage — abstract base class for all page objects.
 *
 * Provides shared helpers that every page needs:
 * navigation, waiting, screenshots, toast assertions, and form filling.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a path relative to baseURL. */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait until the page finishes all network activity. */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Return the page <title>. */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /** Return the current URL. */
  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  /** Save a full-page screenshot to test-results/screenshots/. */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${filename}.png`,
      fullPage: true,
    });
  }

  /**
   * Read the inline error message element used across auth pages.
   * The TechMart HTML uses <div id="errorMessage" class="error-message hidden">.
   */
  async getErrorMessage(): Promise<string | null> {
    const errorEl = this.page.locator('#errorMessage');
    const isHidden = await errorEl.evaluate(
      (el) => el.classList.contains('hidden'),
    );
    if (isHidden) return null;
    return errorEl.textContent();
  }

  /** Assert that the inline error message contains the expected text. */
  async expectErrorMessage(expectedText: string): Promise<void> {
    const errorEl = this.page.locator('#errorMessage');
    await expect(errorEl).not.toHaveClass(/hidden/);
    await expect(errorEl).toContainText(expectedText);
  }

  /**
   * Assert that the toast notification is visible and contains the expected text.
   * The TechMart HTML uses <div id="toast" class="toast hidden">.
   */
  async expectToast(expectedText: string): Promise<void> {
    const toast = this.page.locator('#toast');
    await expect(toast).not.toHaveClass(/hidden/);
    await expect(toast).toContainText(expectedText);
  }

  /**
   * Fill multiple form fields by their associated <label> text.
   * Example: await page.fillForm({ 'Email Address': 'a@b.com' });
   */
  async fillForm(fields: Record<string, string>): Promise<void> {
    for (const [label, value] of Object.entries(fields)) {
      await this.page.getByLabel(label).fill(value);
    }
  }
}
