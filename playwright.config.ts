import { PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  testDir: path.join(__dirname, 'test'),
  // If a test fails, retry it additional 2 times
  retries: 2,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: 'test-results/',

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: 'npm run start',
    port: 3333,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Retry a test if its failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: {
      screenshots: true,
      snapshots: true,
      sources: true,
      mode: 'on-first-retry',
    },
    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   ignoreHTTPSErrors: true,
    // },
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    // on arch (thats what i get for using arch sigh can only blame myself)
    // yay -S enchant1.6 icu66 libwebp052
    // then clone 1312 random fucking github repositories and build them
    // then manually link the libs to fuck knows where
    // then do things that i cant say in comments because theres no content warnings to yourself
    // i love foss
    //    {
    //      name: 'Desktop Safari',
    //      use: {
    //        ...devices['Desktop Safari'],
    //      },
    //    },
    // Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Firefox',
      use: {
        ...devices['Pixel 5'],
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: devices['iPhone 12'],
    // },
  ],
};
export default config;
