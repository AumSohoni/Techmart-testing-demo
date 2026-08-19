/**
 * Shared test data constants and dynamic data generators.
 *
 * All credentials and product names are kept in one place so tests
 * stay DRY and easy to update if the sample app data changes.
 */

/** Static test data matching the TechMart sample-app seed data. */
export const TEST_DATA = {
  /** Pre-seeded demo user (see server.js line 50). */
  validUser: {
    email: 'demo@techmart.com',
    password: 'demo123',
    name: 'Demo User',
  },

  /** Fresh user for registration tests — uses a timestamp to stay unique. */
  newUser: {
    email: `testuser_${Date.now()}@techmart.test`,
    password: 'SecurePass123!',
    name: 'New Test User',
  },

  /** Credentials that should always fail authentication. */
  invalidCredentials: {
    email: 'invalid@test.com',
    password: 'wrongpassword',
  },

  /** Product names matching the server.js products array. */
  testProducts: {
    headphones: 'Wireless Headphones',
    keyboard: 'Mechanical Keyboard',
    hub: 'USB-C Hub',
    stand: 'Monitor Stand',
    webcam: 'Webcam HD',
    mousepad: 'Mouse Pad XL',
  },
};

/** Utility class for generating unique test data at runtime. */
export class TestDataGenerator {
  /** Generate a unique email address. */
  static generateEmail(): string {
    return `testuser_${Date.now()}_${Math.random().toString(36).slice(2, 6)}@techmart.test`;
  }

  /** Generate a random password of the given length. */
  static generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}
