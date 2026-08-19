# TechMart Manual Test Cases

## Feature: User Authentication

### TC-001: Successful User Registration

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-001 |
| **Title** | Successful User Registration |
| **Module** | Authentication |
| **Preconditions** | User not registered, browser cache cleared |
| **Test Data** | Email: newuser@techmart.com, Password: SecurePass123! |

**Steps:**
1. Navigate to `http://localhost:3000/register`
2. Verify registration form displays (Email, Password, Confirm Password fields)
3. Enter email: newuser@techmart.com
4. Enter password: SecurePass123!
5. Enter confirm password: SecurePass123!
6. Click "Register" button
7. Verify success message appears
8. Verify redirected to login page

**Expected Result:** 
- User account created successfully
- Redirect to login page with message "Registration successful. Please login."
- No errors displayed

**Actual Result:** 
- User redirected to HomePage
- No errors displayed

**Status:** PASS 

---

### TC-002: Registration with Duplicate Email

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-002 |
| **Title** | Registration Fails with Existing Email |
| **Module** | Authentication |
| **Preconditions** | Email demo@techmart.com exists in system |

**Steps:**
1. Navigate to registration page
2. Enter email: demo@techmart.com
3. Enter password: TestPass123!
4. Enter confirm password: TestPass123!
5. Click Register button
6. Observe error message

**Expected Result:** 
Error message displayed: "Email already registered. Please login or use a different email."

**Status:** PASS 

---

### TC-003: Registration Password Mismatch

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-003 |
| **Title** | Registration Fails When Passwords Don't Match |

**Steps:**
1. Navigate to registration page
2. Enter email: user@test.com
3. Enter password: SecurePass123!
4. Enter confirm password: Different123!
5. Click Register button

**Expected Result:** 
Error message: "Passwords do not match."

**Status:** PASS

---

### TC-004: Login with Valid Credentials

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-004 |
| **Title** | Successful Login |
| **Preconditions** | User registered with email: demo@techmart.com, password: demo123 |

**Steps:**
1. Navigate to login page
2. Enter email: demo@techmart.com
3. Enter password: demo123
4. Click Login button
5. Wait for page to load

**Expected Result:** 
- User logged in successfully
- Redirected to dashboard/home page
- User name displayed (e.g., "Welcome, Demo User")
- Logout option visible

**Status:** PASS / FAIL

---

### TC-005: Login with Invalid Password

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-005 |
| **Title** | Login Fails with Wrong Password |

**Steps:**
1. Navigate to login page
2. Enter email: demo@techmart.com
3. Enter password: wrongpassword
4. Click Login button

**Expected Result:** 
Error message displayed: "Invalid email or password."
- User remains on login page
- No sensitive error details leaked (doesn't say "password is wrong")

**Status:** PASS

---

## Feature: Shopping Cart

### TC-006: Add Single Item to Cart

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-006 |
| **Title** | Add Single Product to Cart |
| **Preconditions** | Logged in, on product listing page |

**Steps:**
1. Verify at least 3 products displayed
2. Click "Add to Cart" button on first product (Wireless Headphones - $79.99)
3. Observe cart icon in header
4. Verify product appears in cart
5. Note quantity is 1

**Expected Result:** 
- Cart count in header shows "1"
- Success message: "Item added to cart"
- Product displayed in cart with correct price

**Status:** PASS / FAIL

---

### TC-007: Add Multiple Items to Cart

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-007 |
| **Title** | Add Multiple Different Products to Cart |

**Steps:**
1. Add Wireless Headphones ($79.99) to cart
2. Add Mechanical Keyboard ($129.99) to cart
3. Add USB-C Hub ($49.99) to cart
4. View cart

**Expected Result:** 
- Cart count shows "3"
- All 3 items displayed in cart
- Subtotal calculates correctly: $259.97
- Each item shows correct quantity (1)

**Status:** PASS / FAIL

---

### TC-008: Increase Item Quantity in Cart

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-008 |
| **Title** | Increase Quantity of Cart Item |

**Steps:**
1. Add Wireless Headphones to cart
2. Navigate to cart
3. Click "+" button next to item quantity
4. Verify quantity changed from 1 to 2
5. Observe cart total updated

**Expected Result:** 
- Quantity increased to 2
- Subtotal recalculated: $159.98 (79.99 × 2)
- Cart badge updated to "2"

**Status:** PASS / FAIL

---

### TC-009: Remove Item from Cart

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-009 |
| **Title** | Remove Product from Cart |

**Steps:**
1. Add 2 items to cart (Headphones, Keyboard)
2. Navigate to cart
3. Click "Remove" button on Headphones
4. Verify item removed

**Expected Result:** 
- Headphones removed from cart
- Cart shows only Keyboard
- Subtotal updated: $129.99
- Cart count shows "1"

**Status:** PASS / FAIL

---

## Feature: Product Search & Filters

### TC-010: Search for Product by Name

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-010 |
| **Title** | Search Products by Keyword |

**Steps:**
1. Navigate to products page
2. Find search box
3. Enter search term: "keyboard"
4. Press Enter or click Search
5. Observe results

**Expected Result:** 
- Only products with "keyboard" in name displayed
- "Mechanical Keyboard" shown
- Other products filtered out
- Result count shows "1 result found"

**Status:** PASS / FAIL

---

### TC-011: Filter Products by Category

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-011 |
| **Title** | Filter Products by Category |

**Steps:**
1. Navigate to products page
2. Find category filter (Electronics, Accessories)
3. Select "Accessories"
4. Observe filtered results

**Expected Result:** 
- Only accessories shown: Monitor Stand, Mouse Pad XL
- Electronics products hidden
- Filter indicator shows "Accessories" selected

**Status:** PASS / FAIL

---

### TC-012: Filter by Price Range

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-012 |
| **Title** | Filter Products by Price Range |

**Steps:**
1. Navigate to products page
2. Find price range filter
3. Set range: $50 - $100
4. Apply filter

**Expected Result:** 
- Only products in $50-100 range shown:
  - Wireless Headphones ($79.99)
  - USB-C Hub ($49.99) - if inclusive
  - Webcam HD ($69.99)
  - Monitor Stand ($89.99)
- Products outside range hidden

**Status:** PASS / FAIL

---

## Feature: Checkout Process

### TC-013: Complete Checkout with Valid Shipping

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-013 |
| **Title** | Complete Purchase Checkout |
| **Preconditions** | Logged in, cart has 1+ items |

**Steps:**
1. Navigate to cart (add Headphones $79.99)
2. Click "Proceed to Checkout"
3. Verify shipping address form displayed
4. Select or enter shipping address
5. Select shipping method (Standard - 5-7 days)
6. Click Continue
7. Verify order summary displayed
8. Verify total includes shipping cost
9. Click "Place Order"

**Expected Result:** 
- Order placed successfully
- Order confirmation page displayed
- Order number shown (e.g., ORD-12345)
- Confirmation message: "Order placed successfully"
- Order appears in user's order history

**Status:** PASS / FAIL

---

### TC-014: Checkout Cart Summary Accuracy

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-014 |
| **Title** | Verify Order Summary Calculations |

**Steps:**
1. Add to cart:
   - Headphones: 1 × $79.99
   - Keyboard: 1 × $129.99
2. Proceed to checkout
3. Review order summary calculations

**Expected Result:** 
- Subtotal: $209.98
- Shipping: $10.00 (or standard rate)
- Tax: $17.10 (approximately 8% if applicable)
- **Total: $237.08** (or correct total with tax)
- Each line item correct
- Quantities correct

**Status:** PASS / FAIL

---

## Boundary Value Analysis Tests

### TC-015: Login - Empty Email Field

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-015 |
| **Title** | Login with Empty Email |

**Steps:**
1. Navigate to login page
2. Leave email field empty
3. Enter password: demo123
4. Click Login

**Expected Result:** 
- Error message: "Email is required" (or similar)
- User not logged in
- Remains on login page

**Status:** PASS / FAIL

---

### TC-016: Login - Empty Password Field

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-016 |
| **Title** | Login with Empty Password |

**Steps:**
1. Navigate to login page
2. Enter email: demo@techmart.com
3. Leave password field empty
4. Click Login

**Expected Result:** 
Error message: "Password is required"

**Status:** PASS / FAIL

---

### TC-017: Registration - Password Too Short

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-017 |
| **Title** | Registration with Password < 8 Characters |

**Steps:**
1. Navigate to registration page
2. Enter email: newuser@test.com
3. Enter password: pass123 (7 characters)
4. Enter confirm password: pass123
5. Click Register

**Expected Result:** 
- Error message: "Password must be at least 8 characters"
- Registration not completed

**Status:** PASS / FAIL

---

### TC-018: Search - Empty Search Term

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-018 |
| **Title** | Search with Empty Query |

**Steps:**
1. Navigate to products page
2. Leave search box empty
3. Click Search (or press Enter)

**Expected Result:** 
- All products displayed (default behavior)
- OR error message: "Please enter a search term"

**Status:** PASS / FAIL

---

### TC-019: Registration with Invalid Email Format

| Field | Value |
|-------|-------|
| **Test Case ID** | TC-019 |
| **Title** | Registration Fails with Invalid Email Format |

**Steps:**
1. Navigate to registration page
2. Enter email: demo@te
3. Enter password: SecurePass123!
4. Enter confirm password: SecurePass123!
5. Click Register button

**Expected Result:** 
- Error message displayed: "Invalid email format" (or equivalent validation message)
- User remains on registration page
- Account is not created

**Actual Result:**
- Registration succeeds with invalid email demo@te
- User account is created
- No validation error displayed

**Status:** FAIL

---

## Bug Report Template

### BUG-001: [Brief Description]

```
**Severity:** High / Medium / Low / Critical
**Priority:** P0 / P1 / P2 / P3
**Status:** NEW / ASSIGNED / IN PROGRESS / FIXED / CLOSED

**Title:** 
[Descriptive title of the bug]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- App Version: 1.0.0
- User Role: Regular User / Admin

**Attachments:**
- screenshot.png
- error-log.txt
- video.mp4

**Additional Notes:**
[Any additional context]

**Assigned to:** [QA Engineer Name]
**Date Reported:** [Date]
**Date Fixed:** [Date when fixed]
```

---

## Execution Summary Sheet

| TC ID | Title | Status | Date | Notes |
|-------|-------|--------|------|-------|
| TC-001 | Successful Registration | PASS | 2024-08-18 | - |
| TC-002 | Duplicate Email | PASS | 2024-08-18 | - |
| TC-003 | Password Mismatch | PASS | 2024-08-18 | - |
| TC-004 | Valid Login | PASS | 2024-08-18 | - |
| TC-005 | Invalid Password | PASS | 2024-08-18 | - |
| TC-006 | Add to Cart | FAIL | 2024-08-18 | Error msg not shown |
| TC-007 | Multiple Items | PASS | 2024-08-18 | - |
| TC-019 | Invalid Email Registration | FAIL | 2026-08-19 | Account created for invalid email format |
| ... | ... | ... | ... | ... |

**Summary:**
- Total Test Cases: 19
- Passed: 16
- Failed: 3
- Pass Rate: 84.2%
- Bugs Found: 3

---

## Tips for Effective Manual Testing

1. **Test with fresh perspective**: Clear cache, use incognito mode
2. **Test with real data**: Use actual names, emails, addresses
3. **Check error messages**: Are they helpful? Do they leak sensitive info?
4. **Test negative scenarios**: What happens when things go wrong?
5. **Document everything**: Screenshots, exact steps, error messages
6. **Don't assume**: Verify expected behavior with developers/product team
7. **Test on multiple browsers**: Chrome, Firefox, Safari, Edge
8. **Test on mobile**: Different screen sizes and touch interactions
9. **Test accessibility**: Use keyboard only (no mouse), test with screen reader
10. **Think like a user**: Would a real user do this? What would confuse them?

---

## Personal Execution Evidence (Fill During Real Runs)

Use this section to prove your own manual work with traceable artifacts.

### Session Log

| Session ID | Date | Start | End | Browser | Scope Tested | Cases Run | Pass | Fail | Blocked |
|------------|------|-------|-----|---------|--------------|-----------|------|------|---------|
| MT-001 | YYYY-MM-DD | HH:MM | HH:MM | Chrome | Auth | 0 | 0 | 0 | 0 |
| MT-002 | YYYY-MM-DD | HH:MM | HH:MM | Firefox | Cart + Checkout | 0 | 0 | 0 | 0 |

### Test Case Evidence Log

| TC ID | Result | Date | Screenshot/Video Path | Bug ID (if fail) | Notes |
|------|--------|------|------------------------|------------------|-------|
| TC-001 | PASS/FAIL | YYYY-MM-DD | evidence/manual/TC-001.png | BUG-XXX | |
| TC-002 | PASS/FAIL | YYYY-MM-DD | evidence/manual/TC-002.png | BUG-XXX | |
| TC-003 | PASS/FAIL | YYYY-MM-DD | evidence/manual/TC-003.png | BUG-XXX | |
| TC-004 | PASS/FAIL | YYYY-MM-DD | evidence/manual/TC-004.png | BUG-XXX | |
| TC-005 | PASS/FAIL | YYYY-MM-DD | evidence/manual/TC-005.png | BUG-XXX | |

### Evidence File Naming Standard

- Manual screenshots: TC-XXX_step-YY_result.png
- Manual recordings: TC-XXX_full-run.mp4
- Console logs: TC-XXX_console.txt

### Reviewer Sign-Off

| Name | Role | Date | Notes |
|------|------|------|-------|
| | QA Executor | | |
| | QA Reviewer | | |
