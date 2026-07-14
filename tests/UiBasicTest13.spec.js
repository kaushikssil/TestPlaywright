//import the playwright module
const { test, expect } = require("@playwright/test");

//Creata a webcontext variavle for the Strogare state
let webContext;

//Before the actual testing happening we need to do API call for LOGIN to the application
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //Navigate to practise  page
  await page.goto("https://rahulshettyacademy.com/client/");

  //Type on with correct username
  await page.locator("#userEmail").fill("kaushik.aryaan@gmail.com");

  //Type the correct password
  await page.locator("#userPassword").fill("Test@1234");

  //Click on Sign in button - different CSS locator
  await page.locator('input[id="login"]').click();

  //Wait for network class to be over as the page changes - Can be used only when web services are used
  await page.waitForLoadState("networkidle");

  //Get what is stored in APPLICATION tab of DEveloper tool once we login and store it in storage.json file
  await context.storageState({ path: "Storage.json" });

  //Use the above details in new browser context
  webContext = await browser.newContext({ storageState: "Storage.json" });
});

test("@API API Testing with Browser Context  - End to End Test - 2", async ({}) => {
  //With browser context stored in Storage.json file , we create a new page
  const page = await webContext.newPage();

  const product = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const dropDownAutoSuggestion = page.locator(".ta-results");
  const countryName = " India";
  const rows = page.locator("tbody tr");

  //Navigate to practise  page
  await page.goto("https://rahulshettyacademy.com/client/");

  //PRODUCT PAGE
  //Wait for the DOM to be loaded for ZARA COAT 3 - Product page
  await product.first().waitFor();

  //Get text of all the products in product page
  const allText = await page.locator(".card-body b").allTextContents();
  console.log("Text of all products in product page are " + allText);

  //Number of elements with same locator value - '.card-body'
  const numberOfProductWithSameLocatorValue = await product.count();
  console.log(
    "Number of elements with locator value '.card-body' are " +
      numberOfProductWithSameLocatorValue,
  );

  //Iterate over all products in product page to see the text 'ZARA COAT 3'. Corresponding to this text click on ADD TO CART
  for (let i = 0; i < numberOfProductWithSameLocatorValue; i++) {
    const itemText = await product.nth(i).locator("b").textContent();
    console.log(itemText);
    if (itemText === productName) {
      //Use a new CSS locator value - TEXT locator can be used in CSS when there is a inner text
      //Click on the ADD TO CART button
      await product.nth(i).locator("text =  Add To Cart").click();
    }
  }

  //Click on the CART MENU LINK
  await page.locator("[routerlink*='cart']").click();

  //MY CART PAGE
  //Page changes so wait for the DOM of My Cart in MY CART page
  await page.locator("div li").first().waitFor();

  //Assert the text ZARA COAT 3 is visible in the MY CART PAGE
  //Another way  - TEXT locator can be used in CSS when there is a inner text
  const boolVal = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(boolVal).toBeTruthy();

  //Click on CHECKOUT button
  //TEXT locator can be used in CSS when there is a inner text - Checkout
  await page.locator("text = Checkout").click();

  //Wait for netwrok calls to be over - Page changing after checkout button clicked  -PAYMENT METHOD PAGE COMES
  await page.waitForLoadState("networkidle");

  //PAYMENT METHOD PAGE
  //Assert that the text CREDIT CARD NUMBER is present
  await expect(page.locator("text=Credit Card Number ")).toHaveText(
    "Credit Card Number ",
  );

  //Clear and type the credit card number
  await page.locator(".field input.text-validated").fill("");
  await page.locator(".field input.text-validated").fill("4323123454234534");

  //Assert the EXPIRY DATE IS VISIBLE
  expect(await page.locator("text=Expiry Date ").isVisible()).toBeTruthy();

  //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
  const month = page.locator("select.ddl").first();
  await month.selectOption("03");

  //Click on the year drop down created by SELECT tag. Select 24 as the year from the options
  const year = page.locator("select.ddl").last();
  await year.selectOption("24");

  //Assert the CVV Code text is present
  const textCVV = await page.locator(".small .title").nth(1).textContent();
  console.log(textCVV);
  expect(textCVV).toContain("CVV Code");

  //Type on CVV Code edit box
  await page.locator(".small .txt").first().fill("213");

  //Assert that the text NAME ON CARD is visible
  expect(await page.locator("text=Name on Card ").isVisible()).toBeTruthy();

  //Type on Name on card field
  await page.locator(".field .txt").nth(2).fill("Kaushik Mukherjee");
  //await page.pause();

  //Assert that the email 'kaushik.aryaan@gmail.com' is present  - This email is graded
  await expect(page.locator(".user__name [type = 'text']").first()).toHaveText(
    "kaushik.aryaan@gmail.com",
  );
  //await page.pause();

  //Auto  - Suggestion for Select country
  //Fill the Select Country edit box
  //Do not use the fill() method for getting auto-suggestion. Use pressSequentially() method
  //await page.locator("[placeholder = 'Select Country']").fill('ind');
  await page
    .locator("[placeholder = 'Select Country']")
    .pressSequentially("ind");
  //await page.pause();

  //Wait for the DOM to be present for auto suggestion
  await dropDownAutoSuggestion.waitFor();

  //Find the count of elements whihc have the locator '.ta-results button' --> dropDownAutoSuggestion.locator('button')
  //Find number of elemenst in auto suggestion table which has the sub string 'ind'
  const numOfCountryWithINDAsSubString = await dropDownAutoSuggestion
    .locator("button")
    .count();
  console.log(
    "Number of counry with .ind' as substring in auto suggestion table are " +
      numOfCountryWithINDAsSubString,
  );

  const optionCount = await dropDownAutoSuggestion.locator("button").count();
  for (let i = 0; i < optionCount; ++i) {
    const text = await dropDownAutoSuggestion
      .locator("button")
      .nth(i)
      .textContent();
    console.log(text);
    if (text === countryName) {
      await dropDownAutoSuggestion.locator("button").nth(i).click();
      break;
    }
  }
  //await page.pause();

  //Click on PLACE ORDER button
  await page.locator(".action__submit").click();

  //Wait for the network calls to be over
  await page.waitForLoadState("networkidle");

  //THANK YOU PAGE
  //Assert that the element has the text ' Thankyou for the order. '
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  //Get the ORDER ID
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log("The order id is " + orderId);

  //Click on ORDER menu mink
  await page.locator("button[routerlink*='myorder']").click();

  //YOUR ORDERS PAGE
  //Wait for the DOM for table body
  await page.locator("tbody").waitFor();

  const numberRows = await rows.count();
  console.log("Number of locators ahving same value are " + numberRows);

  //Iterate over the row with that ORDER ID present also in THANK YOU page and click on VIEWS button
  for (let i = 0; i < (await rows.count()); i++) {
    //get the order id
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    //Match the row order with the expected validateHeaderValue
    if (orderId.includes(rowOrderId)) {
      //Click on the VIEW button if order ID matches
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  //await page.pause();

  //ORDER SUMMARY PAGE
  //Assert that same ORDER ID as present in THANK YOU PAGE is present in ORDER SUMMARY PAGE
  const OrderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(OrderIdDetails)).toBeTruthy();
});
