import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * ProductsPage — page object for the home page (index.html)
 *
 * Locators are derived from the actual index.html markup:
 *   - .product-card           (each product tile)
 *   - .add-to-cart-btn        (Add to Cart buttons inside product cards)
 *   - #searchInput            (search text box)
 *   - #searchBtn              (search submit button)
 *   - #categoryFilter         (category <select>)
 *   - #priceRange             (price range <input type="range">)
 *   - #sortBy                 (sort-by <select>)
 *   - #cartCount              (cart badge count in navbar)
 */
export class ProductsPage extends BasePage {
  readonly productCards: Locator;
  readonly addToCartButtons: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly categoryFilter: Locator;
  readonly priceRange: Locator;
  readonly sortBy: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.productCards = page.locator('.product-card');
    this.addToCartButtons = page.locator('.add-to-cart-btn');
    this.searchInput = page.locator('#searchInput');
    this.searchButton = page.locator('#searchBtn');
    this.categoryFilter = page.locator('#categoryFilter');
    this.priceRange = page.locator('#priceRange');
    this.sortBy = page.locator('#sortBy');
    this.cartCount = page.locator('#cartCount');
  }

  /** Navigate to the home / products page. */
  async navigate(): Promise<void> {
    await super.navigate('/');
  }

  /** Return the number of product cards currently visible. */
  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  /** Click the "Add to Cart" button on the nth product (0-based). */
  async addToCartByIndex(index: number): Promise<void> {
    await this.addToCartButtons.nth(index).click();
  }

  /** Find a product card by its name text and click its "Add to Cart" button. */
  async addToCartByName(productName: string): Promise<void> {
    const card = this.productCards.filter({ hasText: productName });
    await card.locator('.add-to-cart-btn').click();
  }

  /** Type a search query and click the search button. */
  async searchProducts(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  /** Select a category from the dropdown. */
  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category);
    await this.waitForPageLoad();
  }

  /** Select a sort option from the dropdown. */
  async sortProductsBy(option: string): Promise<void> {
    await this.sortBy.selectOption(option);
  }

  /** Return the text content of every product card's <h3> name. */
  async getProductNames(): Promise<string[]> {
    return this.productCards.locator('h3').allTextContents();
  }

  /** Return the cart badge count shown in the navbar. */
  async getCartBadgeCount(): Promise<string> {
    return (await this.cartCount.textContent()) ?? '0';
  }
}
