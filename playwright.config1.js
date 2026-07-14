// @ts-check
const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",

  retries: 1,
  workers: 3,
  //fullyParallel: true,

  /* Maximum time one test can run for.After 30 seconds that failure is shown.*/
  timeout: 30 * 1000,

  /* Used for assertions.*/
  expect: {
    timeout: 5000,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /*use: {
    
    //Define the browser for firefox
    browserName: 'firefox',

    //To run in headed mode make headless as false
    headless: true,

    //Trace in case of fail
    trace: 'on',

    //Screenshot
    screenshot: 'on',
    
  },*/
  /* Shared settings for all the projects below. See https://playwright.dev/docs/test-use-options#other-options. */
  projects: [
    {
      name: "Firefox",
      use: {
        //Define the browser for firefox
        browserName: "firefox",

        //To run in headed mode make headless as false
        headless: false,

        //Trace in case of fail
        trace: "on",

        //Screenshot

        screenshot: "off",

        //Device property to emulate mobile devices
        //...devices['iPhone 11'],
      },
    },
    {
      name: "Chrome",
      use: {
        //Define the browser for firefox
        browserName: "chromium",

        //To run in headed mode make headless as false
        headless: false,

        //Ignore HTTPS error property
        //ignoreHttpsErrors:true,

        //Allow GEO locations
        //permissions:['geolocation'],

        //Trace in case of fail
        trace: "on",

        //Screenshot
        screenshot: "on",

        //Viewport property to open browser with my own width and height
        //viewport: { width: 720, height: 720 },

        //Device Property to emulate mobile devices
        //...devices["Galaxy S8"],

        //Video
        video: "on",
      },
    },
    {
      name: "Safari",
      use: {
        //Define the browser for firefox
        browserName: "webkit",

        //To run in headed mode make headless as false
        headless: true,

        //Trace in case of fail
        trace: "on",

        //Screenshot
        screenshot: "off",

        //Device property to emulate mobile devices
        //...devices["iPhone 11"],
      },
    },
  ],
};

module.exports = config;
