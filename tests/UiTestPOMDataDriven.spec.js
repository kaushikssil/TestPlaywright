//Imported the annotation 'playwright' and call that as 'test'
const { test, expect } = require("@playwright/test");
const { PageObjectManager } = require("../pageobject/PageObjectManager");
//Imported the TestData file for driving data
//Convert JSON to JS Object by using parse method
//To avoid problems with UTF -8 encoding, convert it to String using stringify method

//Convert from STRING TO JAVASCRIPT OBJECT
const dataset = JSON.parse(
  //Coverting from JSON format to String
  JSON.stringify(require("../utils/UiTestPOMData.json")),
);

test("@Web End to End Playwright Test - POM with Data driven", async ({
  page,
}) => {
  const rows = page.locator("tbody tr");

  //Adding a comment for running YAML file on PUSH
  //Add changes for PULL
  //PageObjectManager page - object
  const pageObjectManager = new PageObjectManager(page);
  const loginPage = pageObjectManager.getLoginPage();
  const dashboardPage = pageObjectManager.getDashboardPage();
  //MyCartPage Page - OBJECT
  const myCartPage = pageObjectManager.getMyCartPage();
  //PaymentMethodPage Page - OBJECT
  const paymentMethodPage = pageObjectManager.getPaymentMethodPage();
  //ThankYouPage Page - OBJECT
  const thankYouPage = pageObjectManager.getThankYouPage();
  //YourOrderPage Page - OBJECT
  const yourOrderPage = pageObjectManager.getYourOrderPage();
  //OrderSummaryPage page - OBJECT
  const orderSummaryPage = pageObjectManager.getOrderSummaryPage();

  //Navigate to URL
  await loginPage.goToUrl();
  //Type on Username field, password field and click on login button, Wait until all network calls are loaded
  await loginPage.validLogin(dataset.username, dataset.password);

  //Click ADD TO CART button for the product name 'ZARA COAT 3'
  await dashboardPage.clickAddToCartBasedOnProductName(dataset.productName);

  //Click on the CART Link
  await dashboardPage.clickCartLink();

  //My Cart Page
  //Assert that text ZARA COAT 3 is visible in CART PAGE
  await myCartPage.assertVisibilityTextZara();

  //Click on Checkout button
  await myCartPage.clickCheckoutButton();

  //Payment Method Page
  //Assert that the text CREDIT CARD NUMBER is present
  await paymentMethodPage.assertTextCreateCardnumberPresent();

  //Clear and type the credit card number
  await paymentMethodPage.typeCreditCard();

  //Assert the EXPIRY DATE IS VISIBLE
  await paymentMethodPage.assertExpiryDateVisible();

  //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
  await paymentMethodPage.dropDownMonthSelect();

  //Click on the year drop down created by SELECT tag. Select 24 as the year from the options
  await paymentMethodPage.dropDownYearSelect();

  //Assert the CVV Code text is present
  await paymentMethodPage.assertCVVCodeTextPresent();

  //Type on CVV Code edit box
  await paymentMethodPage.typeCvvCodeEditBox();

  //Assert that the text NAME ON CARD is visible
  await paymentMethodPage.assertNameOnCardTextVisible();

  //Type on Name on card field
  await paymentMethodPage.typeNameOncardEditBox();

  //Assert that the text is the email
  await paymentMethodPage.assertEmailText("kaushik.aryaan@gmail.com");

  //Auto suggestion on Select Country edit box
  await paymentMethodPage.chooseAutoSuggestionData(
    dataset.countryName,
    dataset.countryInitial,
  );

  //Click on Place order
  await paymentMethodPage.clickPlaceOrderButton();

  //ThankYou Page
  //Assertion for the text to be Thankyou for the order.
  await thankYouPage.assertTextThankYou();

  //Get the order id
  let orderIdValue = await thankYouPage.getOrderId();
  console.log("Thank You Page order id value is " + orderIdValue);

  //Click on ORDERS buttton
  await thankYouPage.clickOrderButton();

  //Your Order Page
  //Click on VIEWS button based on order
  await yourOrderPage.iterateSpecificOrderClickViewsButton(orderIdValue);

  //Assert that the order value is truw in order summary page
  await orderSummaryPage.assertOrderValeOrderSummaryPage(orderIdValue);
});
