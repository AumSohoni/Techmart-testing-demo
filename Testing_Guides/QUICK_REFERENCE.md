# QA Testing Quick Reference Guide

Your complete learning resource organized by learning level.

---

## 🎯 QUICK START (Start Here!)

### What You Have
```
software-testing-course/
├── sample-app/              # The TechMart demo app
│   ├── server.js           # Express backend
│   ├── public/
│   │   ├── index.html      # Home page
│   │   ├── login.html      # Login page
│   │   ├── register.html   # Registration page
│   │   ├── checkout.html   # Checkout page
│   │   └── app.js          # Frontend logic
│   └── package.json
│
└── Documentation/
    ├── QA_TESTING_ROADMAP.md        # Complete learning path
    ├── MANUAL_TEST_CASES.md         # 18+ test cases to execute
    ├── PLAYWRIGHT_SETUP_GUIDE.md    # Step-by-step automation setup
    └── TEST_PLAN.md                 # Enterprise test plan
```

### Day 1: Setup Your Environment
```bash
cd software-testing-course/sample-app
npm install
npm start              # App runs on http://localhost:3000

# In another terminal:
cd software-testing-course
npm init -y
npm install -D @playwright/test @types/node typescript
```

### Day 2: Manual Testing (Hands-On)
1. Open http://localhost:3000 in your browser
2. Read MANUAL_TEST_CASES.md (18+ test cases)
3. Execute 5-10 test cases manually
4. Find bugs and document them
5. Take screenshots of issues

### Day 3-5: Automation Learning
1. Follow PLAYWRIGHT_SETUP_GUIDE.md step by step
2. Create Page Objects for Login and Cart
3. Write first 3-5 automated E2E tests
4. Run tests with `npm test`
5. Fix any failures

---

## 📚 LEARNING PATH BY ROLE

### For QA Engineers (Manual Testing Focus)

**Week 1: Foundations**
- ✅ Read: QA_TESTING_ROADMAP.md → "QA FUNDAMENTALS" section
- ✅ Understand: Testing pyramid, test types
- ✅ Learn: Equivalence partitioning, boundary analysis
- ✅ Practice: Design 5 test cases for user registration

**Week 2: Manual Testing**
- ✅ Read: MANUAL_TEST_CASES.md (all sections)
- ✅ Execute: Run 18 test cases on TechMart app
- ✅ Document: Create bug reports for any issues found
- ✅ Practice: Exploratory testing (30-45 min sessions)

**Week 3: Test Planning**
- ✅ Read: TEST_PLAN.md (overview, coverage matrix)
- ✅ Understand: Risk analysis, entry/exit criteria
- ✅ Create: Test cases for a new feature

**Week 4: Advanced Topics**
- ✅ Study: Security, performance, accessibility testing
- ✅ Practice: WCAG testing, screen reader usage
- ✅ Learn: How to work with automation engineers

---

### For QA Automation Engineers (Automation Focus)

**Week 1: Foundations + Setup**
- ✅ Read: QA_TESTING_ROADMAP.md → "AUTOMATED TESTING" section
- ✅ Setup: Follow PLAYWRIGHT_SETUP_GUIDE.md steps 1-2
- ✅ Install: Node.js, Playwright, TypeScript
- ✅ Verify: `npm test --version` works

**Week 2: Page Object Model**
- ✅ Study: PLAYWRIGHT_SETUP_GUIDE.md → "Page Object Model" section
- ✅ Create: BasePage, LoginPage, CartPage objects
- ✅ Practice: Implement selectors with `getByRole`, `getByLabel`
- ✅ Test: Can you locate all interactive elements?

**Week 3: Writing E2E Tests**
- ✅ Read: PLAYWRIGHT_SETUP_GUIDE.md → "Test Structure"
- ✅ Write: 10+ E2E test cases following Arrange-Act-Assert
- ✅ Debug: Fix selector issues with Playwright Inspector
- ✅ Run: `npm run test:ui` to see tests execute

**Week 4: CI/CD & Advanced**
- ✅ Setup: GitHub Actions workflow
- ✅ Learn: Fixtures, hooks, test data management
- ✅ Optimize: Parallel execution, retry logic
- ✅ Report: Generate and analyze test reports

---

### For QA Managers

**Week 1: Strategy**
- ✅ Read: QA_TESTING_ROADMAP.md → "ENTERPRISE QA PRACTICES"
- ✅ Study: TEST_PLAN.md (complete document)
- ✅ Understand: Risk assessment, prioritization

**Week 2: Planning**
- ✅ Create: Test plan for your organization
- ✅ Define: Entry/exit criteria, success metrics
- ✅ Allocate: Resources, timelines, budgets

**Week 3: Execution**
- ✅ Monitor: Daily test results and metrics
- ✅ Track: Bug trends and severity distribution
- ✅ Communicate: Status reports to stakeholders

**Week 4: Metrics & Improvement**
- ✅ Analyze: Defect escape rate, automation ROI
- ✅ Optimize: Team processes, tool usage
- ✅ Improve: Continuous enhancement of QA

---

## 🔍 CONCEPT REFERENCE

### Testing Pyramid (Quick Recap)

```
                 ▲
                ╱ ╲
               ╱   ╲ Manual Tests (10%)
              ╱─────╲ Run occasionally
             ╱       ╲ Catch unexpected issues
            ╱─────────╲
           ╱           ╱ E2E Tests (20%)
          ╱───────────╱ Playwright, Selenium
         ╱             ╱ Full user journeys
        ╱─────────────╱
       ╱               ╱ Integration (30%)
      ╱───────────────╱ API, Components together
     ╱                 ╱
    ╱___________________╱ Unit Tests (40%)
                        Most numerous
                        Fastest to run
                        Developer focus
```

### Test Case Structure (AAA Pattern)

```typescript
test('should add item to cart', async ({ page }) => {
  // ARRANGE: Setup initial state
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('user@test.com', 'password');

  // ACT: Perform action
  const productsPage = new ProductsPage(page);
  await productsPage.addToCartByIndex(0);

  // ASSERT: Verify result
  await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
});
```

### Bug Severity Levels

| Severity | Impact | Example | Fix Timeline |
|----------|--------|---------|--------------|
| **Critical** | System unusable | Login completely broken | Immediate |
| **High** | Major feature broken | Cart total wrong by $50 | 24 hours |
| **Medium** | Feature partially broken | Filter returns some wrong items | 1 week |
| **Low** | Minor/cosmetic issue | Typo in error message | Backlog |

### Selector Priority (Best to Worst)

```typescript
// 1. BEST - User-centric, semantic
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Email').fill('user@test.com');
await page.getByPlaceholder('Enter password').fill('pass');

// 2. GOOD - Explicit intent
await page.getByTestId('submit-btn').click();

// 3. OK - If above don't work
await page.locator('.submit-button').click();

// 4. AVOID - Brittle, maintenance nightmare
await page.locator('div.form > div:nth-child(2) > button.btn').click();

// 5. NEVER - Too fragile
await page.locator('//*[@id="form"]/div[2]/button').click();
```

---

## ⚡ COMMON COMMANDS

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test auth/login.spec.ts

# Run tests interactively (with UI)
npm run test:ui

# Run tests with browser visible
npm run test:headed

# Debug mode (step through tests)
npm run test:debug

# View test report
npm run test:report
```

### Playwright Inspector

```bash
# Launch Playwright Inspector for debugging
npx playwright codegen http://localhost:3000
```

### TypeScript & Node Setup

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Initialize TypeScript project
npx tsc --init

# Compile TypeScript
npx tsc

# Run Node script
node script.js
```

### Auto-Commit Watcher (GitHub)

```powershell
# From repository root (software-testing-course)
powershell -ExecutionPolicy Bypass -File .\auto-commit.ps1 -Branch main
```

Notes:
- Keeps watching files and auto-runs git add/commit/push after a short quiet period.
- Keep that terminal open while you work.
- Stop any time with Ctrl+C.

---

## 📋 COMMON TEST SCENARIOS

### Login Flow
```
1. Navigate to login page ✓
2. Enter valid credentials ✓
3. Click login button ✓
4. Wait for dashboard load ✓
5. Verify welcome message shows ✓
```

### Add to Cart Flow
```
1. Navigate to home page ✓
2. Find product (by name or index) ✓
3. Click "Add to Cart" button ✓
4. Verify success message ✓
5. Check cart count updated ✓
6. Navigate to cart ✓
7. Verify product appears in cart ✓
```

### Checkout Flow
```
1. Add items to cart ✓
2. Navigate to cart page ✓
3. Click checkout button ✓
4. Fill shipping information ✓
5. Select shipping method ✓
6. Review order summary ✓
7. Click "Place Order" ✓
8. Verify order confirmation ✓
9. Check order number displayed ✓
```

---

## 🐛 DEBUGGING TIPS

### Problem: Test Can't Find Element

**Solutions (in order):**
1. Run in UI mode: `npm run test:ui`
2. Use Playwright Inspector to locate element
3. Check element is visible on page
4. Use `page.getByRole()` instead of CSS selectors
5. Add explicit wait: `await page.waitForSelector('[data-testid="btn"]')`

### Problem: Test is Flaky (Fails Intermittently)

**Solutions:**
1. Add explicit waits: `await page.waitForLoadState('networkidle')`
2. Wait for specific element: `await expect(element).toBeVisible()`
3. Increase timeout: `test.setTimeout(30000);`
4. Check network tab for slow requests
5. Review selector stability

### Problem: Page Takes Too Long to Load

**Solutions:**
1. Check DevTools → Network tab (are resources slow?)
2. Look for 3rd-party scripts (analytics, ads)
3. Reduce test data volume
4. Run Lighthouse performance audit
5. Check server logs for slow queries

### Problem: Can't Login in Tests

**Solutions:**
1. Verify test user exists in database
2. Check password is correct
3. Ensure login endpoint is working (test API manually)
4. Check for CORS issues in browser console
5. Verify session cookies are being set

---

## 📊 METRICS TO TRACK

### Quality Metrics

```
Code Coverage: % of code executed by tests
  Target: 80%+
  Formula: (Lines covered / Total lines) × 100

Test Pass Rate: % of tests passing
  Target: 95%+
  Formula: (Passed tests / Total tests) × 100

Bug Escape Rate: % of bugs found in production
  Target: < 5%
  Formula: (Bugs in prod / Total bugs) × 100

Test Execution Time: How long tests take
  Target: < 15 min for full suite
  Measured: From start to finish
```

### Efficiency Metrics

```
Test Automation ROI (Return on Investment)
  Formula: (Cost saved by automation) / (Cost of automation setup)
  Target: 3x or higher within 3 months

Defect Detection Rate: How many bugs found before release
  Target: 80-90% of total bugs
  Formula: (Bugs found in testing / Total bugs found) × 100

Average Time to Fix Bugs
  Target: < 24 hours for high severity
  Tracked: From bug report to fix deployment
```

---

## 🎓 ENTERPRISE BEST PRACTICES

### Code Organization

```
✅ DO: Keep tests organized by feature
❌ DON'T: Mix auth tests with checkout tests

✅ DO: Reuse Page Objects
❌ DON'T: Duplicate selectors across tests

✅ DO: Use descriptive test names
❌ DON'T: Use vague names like "test1", "test2"

✅ DO: Test one behavior per test
❌ DON'T: Test multiple unrelated things in one test
```

### Maintenance

```
✅ DO: Review and update tests with code changes
❌ DON'T: Ignore failing tests

✅ DO: Keep dependencies updated
❌ DON'T: Use outdated Playwright versions

✅ DO: Document why a test exists
❌ DON'T: Write cryptic test logic

✅ DO: Run tests regularly (CI/CD)
❌ DON'T: Only run tests manually before release
```

---

## 🚀 YOUR LEARNING CHECKLIST

### Week 1
- [ ] Read QA_TESTING_ROADMAP.md (full document)
- [ ] Understand testing pyramid and types
- [ ] Read MANUAL_TEST_CASES.md
- [ ] Execute 10 manual test cases
- [ ] Find at least 2 bugs
- [ ] Write professional bug reports

### Week 2
- [ ] Read TEST_PLAN.md
- [ ] Understand risk assessment and coverage matrix
- [ ] Follow PLAYWRIGHT_SETUP_GUIDE.md steps 1-5
- [ ] Create BasePage and LoginPage classes
- [ ] Run first manual test from VS Code

### Week 3
- [ ] Create CartPage and ProductsPage classes
- [ ] Write 5 login E2E tests
- [ ] Write 5 cart E2E tests
- [ ] Get all tests passing
- [ ] Use `npm run test:ui` to debug

### Week 4
- [ ] Write 10+ additional E2E tests
- [ ] Create fixtures for test setup
- [ ] Add test data utilities
- [ ] Generate test report
- [ ] Achieve 80%+ code coverage

### Week 5-6
- [ ] Set up GitHub Actions CI/CD
- [ ] Integrate Playwright tests in pipeline
- [ ] Create test metrics dashboard
- [ ] Document processes
- [ ] Plan optimization improvements

---

## 📞 GETTING HELP

### Resources

| Question | Resource |
|----------|----------|
| "How do I write a test case?" | MANUAL_TEST_CASES.md |
| "How do I set up Playwright?" | PLAYWRIGHT_SETUP_GUIDE.md |
| "What should my test plan include?" | TEST_PLAN.md |
| "What's the testing pyramid?" | QA_TESTING_ROADMAP.md |
| "How do I find elements in Playwright?" | Playwright Inspector (codegen) |
| "Why is my test failing?" | See DEBUGGING TIPS section above |

### Playwright Documentation

- Official Docs: https://playwright.dev/docs/intro
- API Reference: https://playwright.dev/docs/api/class-page
- Selectors Guide: https://playwright.dev/docs/locators
- Best Practices: https://playwright.dev/docs/best-practices

---

## 🎯 SUCCESS CRITERIA

After completing this roadmap, you should be able to:

✅ Write 20+ professional test cases  
✅ Execute manual tests and document bugs  
✅ Set up Playwright project from scratch  
✅ Build Page Objects for any page  
✅ Write robust E2E tests  
✅ Run tests in CI/CD pipeline  
✅ Generate test reports  
✅ Explain testing pyramid  
✅ Create enterprise test plan  
✅ Mentor others on QA testing  

---

## 🎊 FINAL TIPS

1. **Start small**: Don't try to automate everything at once
2. **Test like a user**: Write tests that match real user behavior
3. **Document as you go**: Keep notes for future reference
4. **Ask questions**: There's no such thing as a dumb question
5. **Iterate and improve**: Tests get better with practice
6. **Have fun**: QA is detective work - enjoy the hunt for bugs! 🔍

---

**Good luck with your QA journey!** 🚀

Created: August 18, 2024  
Last Updated: August 18, 2024  
Feedback: Share your learnings and help improve this guide

---

## GITHUB PROOF CHECKLIST (Show Your Own Work)

Use this flow so your repository clearly demonstrates personal execution.

### Daily Workflow

1. Run manual or automated tests.
2. Save evidence files (screenshots, logs, reports).
3. Update MANUAL_TEST_CASES.md and TEST_PLAN.md with real outcomes.
4. Commit with a specific message about what you tested or fixed.
5. Push the same day.

### Strong Commit Examples

```bash
git commit -m "test(manual): execute TC-006 to TC-010 and log outcomes"
git commit -m "test(e2e): add cart quantity and remove item coverage"
git commit -m "docs(qa): update risk notes and weekly execution metrics"
```

### Minimum Evidence Per Day

- At least one test execution update in docs
- At least one artifact (screenshot, log, or report)
- At least one commit with a precise QA scope

### Weekly Verification

- Confirm commit history reflects daily activity
- Confirm changed files match the commit message
- Confirm reports and screenshots are present for failed scenarios
