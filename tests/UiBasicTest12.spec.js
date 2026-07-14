const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

//JAVASCRIPT OBJECT
const loginPayLoad = {
  userEmail: "kaushik.aryaan@gmail.com",
  userPassword: "Test@1234",
};

const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

//Define the response object
let response;

test.beforeAll(async () => {
  //Get the Session id/Token
  const apiContext = await request.newContext();

  const apiUtils = new APIUtils(apiContext, loginPayLoad);

  //Call the getOrderid() metohod
  response = await apiUtils.getOrderId(orderPayload);
});

test("Refactor End To End Scenario with methods - Network Intercept 1", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const rows = page.locator("tbody tr");

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.sessionToken);

  //LOGIN PAGE - 1
  //Navigate to URL
  await page.goto("https://rahulshettyacademy.com/client");

  //Click on ORDER menu link
  await page.locator("button[routerlink*='myorder']").click();

  //ORDERS PAGE
  //Wait for the locator value "tbody"
  await page.locator("tbody").waitFor();

  //Iterate ove the rows
  for (let k = 0; k < (await rows.count()); k++) {
    //Get the order if from this page
    const rowOrderId = await rows.nth(k).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      //Click on the VIEW button ir order matches
      await rows.nth(k).locator("button").first().click();
      break;
    }
  }

  //ORDER SUMMARY PAGE
  //Assert that the same order is there in ORDER SUMMARY as in Thank you for Order page
  const orderNum = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderNum)).toBeTruthy();
});
