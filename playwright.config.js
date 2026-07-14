// @ts-check
const { devices } = require("@playwright/test");
const { workers } = require("cluster");

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  /* All the specs file are kept in tests folder*/
  testDir: "./tests",
  outputDir: "./test-results",

  //workers: 2,

  /*Maximum time one test can run. After 30 seconds , failure will be show.*/
  timeout: 200 * 1000,

  /* Time period for assertion */
  expect: {
    timeout: 5000,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //Reports can also be generated in JSON format too.
  reporter: [["html", { open: "never" }]],

  //https://playwright.dev/docs/test-use-options
  use: {
    //We can define the headless mode of browser, browse name, screenshots(when to be taken), logs/trace((when to be taken))

    //The browser on which the test case will run
    //chromium supports Chrome and Edge browser
    browserName: "chromium",

    //For firefox browser
    //browserName: 'firefox',

    //For Safari browser - webkit has the same engine of Safari browser - can be used for MAC environment
    //browserName: 'webkit',

    //TO run the browser in head less mode - true
    //TO run the browser in headed mode - false
    ///By default, when headless key is not defined spec file will run in headless mode.
    headless: false,

    //Logs can be defined
    // Options include: 'off', 'on', 'retain-on-failure' and 'on-first-retry'
    trace: "retain-on-failure",

    //Scrennshot to be taken
    //Options include 'off', 'on' and 'only-on-failure'
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] },
  //   },

  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },

  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },

  /* Test against mobile viewports. */
  // {
  //   name: 'Mobile Chrome',
  //   use: { ...devices['Pixel 5'] },
  // },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

module.exports = config;
