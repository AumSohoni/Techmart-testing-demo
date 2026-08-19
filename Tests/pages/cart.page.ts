import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * CartPage — page object for /cart.html
 *
 * Locators are derived from the actual cart.html markup:
 *   - .cart-item              (each item row)
 *   - #total                  (total price)
 *   - #emptyCart              (empty-cart message container)
 *   - #checkoutBtn            (Proceed to Checkout link/button)
 *   - #clearCartBtn           (Clear Cart button)
 *   - .qty-btn                (quantity +/- buttons)
 *   - .remove-btn             (remove item button)
 */
export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly cartTotal: Locator;
  readonly emptyCartSection: Locator;
  readonly checkoutButton: Locator;
  readonly clearCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item');
    this.cartTotal = page.locator('#total');
    this.emptyCartSection = page.locator('#emptyCart');
    this.checkoutButton = page.locator('#checkoutBtn');
    this.clearCartButton = page.locator('#clearCartBtn');
  }

  /** Navigate to the cart page. */
  async navigate(): Promise<void> {
    await super.navigate('/cart.html');
  }

  /** Return the number of items currently in the cart. */
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Return the total price text (e.g. "$79.99"). */
  async getCartTotal(): Promise<string> {
    return (await this.cartTotal.textContent()) ?? '';
  }

  /** Remove an item by its row index (0-based). */
  async removeItemByIndex(index: number): Promise<void> {
    await this.cartItems.nth(index).locator('.remove-btn').click();
  }

  /** Click the "+" button on the nth cart item. */
  async increaseQuantityByIndex(index: number): Promise<void> {
    const qtyButtons = this.cartItems.nth(index).locator('.qty-btn');
    // The second .qty-btn in each row is the "+" button
    await qtyButtons.nth(1).click();
  }

  /** Click the "−" button on the nth cart item. */
  async decreaseQuantityByIndex(index: number): Promise<void> {
    const qtyButtons = this.cartItems.nth(index).locator('.qty-btn');
    // The first .qty-btn in each row is the "−" button
    await qtyButtons.nth(0).click();
  }

  /** Click the "Proceed to Checkout" button. */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.waitForPageLoad();
  }

  /** Click the "Clear Cart" button. */
  async clickClearCart(): Promise<void> {
    await this.clearCartButton.click();
  }

  /** Check whether the "Your cart is empty" section is visible. */
  async isCartEmpty(): Promise<boolean> {
    return !(await this.emptyCartSection.evaluate(
      (el) => el.classList.contains('hidden'),
    ));
  }

  /** Assert that the cart contains exactly N items. */
  async expectCartItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }
}
