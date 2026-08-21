import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './Tests/e2e',

    // Run tests in parallel
    fullyParallel: true,

    // Prevent accidental test.only() in CI
    forbidOnly: !!process.env.CI,

    // Retry failed tests in CI
    retries: process.env.CI ? 2 : 0,

    // One worker in CI for stability
    workers: process.env.CI ? 1 : undefined,

    // Test reports
    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    // Global test settings
    use: {
        baseURL: 'http://127.0.0.1:3000',

        trace: 'on-first-retry',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure',

        headless: true,
    },

    // Browsers
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
            },
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],

    // Automatically start TechMart application
    webServer: {
        command: 'npm start --prefix sample-app',
        url: 'http://127.0.0.1:3000',
        timeout: 120_000,
        reuseExistingServer: !process.env.CI,
    },
});