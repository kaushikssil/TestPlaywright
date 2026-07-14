# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UiBasicTest13.spec.js >> @API API Testing with Browser Context  - End to End Test - 2
- Location: tests\UiBasicTest13.spec.js:34:1

# Error details

```
"beforeAll" hook timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - text:    
  - generic [ref=e25]:
    - paragraph [ref=e26]: Home | Search
    - heading "Filters" [level=4] [ref=e28]
    - generic [ref=e29]:
      - textbox "search" [ref=e31]
      - generic [ref=e32]:
        - heading "Price Range" [level=6] [ref=e33]
        - generic [ref=e34]:
          - textbox "Min Price" [ref=e36]
          - textbox "Max Price" [ref=e38]
      - generic [ref=e39]:
        - heading "Categories" [level=6] [ref=e40]
        - generic [ref=e42]: 
        - generic [ref=e43]:
          - checkbox [ref=e44]
          - generic [ref=e45]: fashion
        - generic [ref=e46]:
          - checkbox [ref=e47]
          - generic [ref=e48]: electronics
        - generic [ref=e49]:
          - checkbox [ref=e50]
          - generic [ref=e51]: household
      - generic [ref=e52]:
        - heading "Sub Categories" [level=6] [ref=e53]
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - checkbox [ref=e57]
          - generic [ref=e58]: t-shirts
        - generic [ref=e59]:
          - checkbox [ref=e60]
          - generic [ref=e61]: shirts
        - generic [ref=e62]:
          - checkbox [ref=e63]
          - generic [ref=e64]: shoes
        - generic [ref=e65]:
          - checkbox [ref=e66]
          - generic [ref=e67]: mobiles
        - generic [ref=e68]:
          - checkbox [ref=e69]
          - generic [ref=e70]: laptops
      - generic [ref=e71]:
        - heading "Search For" [level=6] [ref=e72]
        - generic [ref=e74]: 
        - generic [ref=e75]:
          - checkbox [ref=e76]
          - generic [ref=e77]: men
        - generic [ref=e78]:
          - checkbox [ref=e79]
          - generic [ref=e80]: women
  - generic [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e84]: Showing 3 results |
        - generic [ref=e85]: User can only see maximum 9 products on a page
      - generic [ref=e86]:
        - generic [ref=e88]:
          - img [ref=e89]
          - generic [ref=e90]:
            - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
            - generic [ref=e93]: $ 11500
            - button "View" [ref=e94] [cursor=pointer]:
              - generic [ref=e95]: 
              - text: View
            - button " Add To Cart" [ref=e96] [cursor=pointer]:
              - generic [ref=e97]: 
              - text: Add To Cart
        - generic [ref=e99]:
          - img [ref=e100]
          - generic [ref=e101]:
            - heading "ZARA COAT 3" [level=5] [ref=e102]
            - generic [ref=e104]: $ 11500
            - button "View" [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: 
              - text: View
            - button " Add To Cart" [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
              - text: Add To Cart
        - generic [ref=e110]:
          - img [ref=e111]
          - generic [ref=e112]:
            - heading "iphone 13 pro" [level=5] [ref=e113]
            - generic [ref=e115]: $ 55000
            - button "View" [ref=e116] [cursor=pointer]:
              - generic [ref=e117]: 
              - text: View
            - button " Add To Cart" [ref=e118] [cursor=pointer]:
              - generic [ref=e119]: 
              - text: Add To Cart
    - list "Pagination" [ref=e124]:
      - listitem [ref=e125]:
        - text: «
        - generic [ref=e126]:
          - text: Previous
          - generic [ref=e127]: page
      - listitem [ref=e128]:
        - generic [ref=e129]: You're on page
        - text: "1"
      - listitem [ref=e130]:
        - generic [ref=e131]:
          - text: Next
          - generic [ref=e132]: page
        - text: »
  - generic [ref=e133]: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1   | //import the playwright module
  2   | const { test, expect } = require("@playwright/test");
  3   | 
  4   | //Creata a webcontext variavle for the Strogare state
  5   | let webContext;
  6   | 
  7   | //Before the actual testing happening we need to do API call for LOGIN to the application
> 8   | test.beforeAll(async ({ browser }) => {
      |      ^ "beforeAll" hook timeout of 30000ms exceeded.
  9   |   const context = await browser.newContext();
  10  |   const page = await context.newPage();
  11  | 
  12  |   //Navigate to practise  page
  13  |   await page.goto("https://rahulshettyacademy.com/client/");
  14  | 
  15  |   //Type on with correct username
  16  |   await page.locator("#userEmail").fill("kaushik.aryaan@gmail.com");
  17  | 
  18  |   //Type the correct password
  19  |   await page.locator("#userPassword").fill("Test@1234");
  20  | 
  21  |   //Click on Sign in button - different CSS locator
  22  |   await page.locator('input[id="login"]').click();
  23  | 
  24  |   //Wait for network class to be over as the page changes - Can be used only when web services are used
  25  |   await page.waitForLoadState("networkidle");
  26  | 
  27  |   //Get what is stored in APPLICATION tab of DEveloper tool once we login and store it in storage.json file
  28  |   await context.storageState({ path: "Storage.json" });
  29  | 
  30  |   //Use the above details in new browser context
  31  |   webContext = await browser.newContext({ storageState: "Storage.json" });
  32  | });
  33  | 
  34  | test("@API API Testing with Browser Context  - End to End Test - 2", async ({}) => {
  35  |   //With browser context stored in Storage.json file , we create a new page
  36  |   const page = await webContext.newPage();
  37  | 
  38  |   const product = page.locator(".card-body");
  39  |   const productName = "ZARA COAT 3";
  40  |   const dropDownAutoSuggestion = page.locator(".ta-results");
  41  |   const countryName = " India";
  42  |   const rows = page.locator("tbody tr");
  43  | 
  44  |   //Navigate to practise  page
  45  |   await page.goto("https://rahulshettyacademy.com/client/");
  46  | 
  47  |   //PRODUCT PAGE
  48  |   //Wait for the DOM to be loaded for ZARA COAT 3 - Product page
  49  |   await product.first().waitFor();
  50  | 
  51  |   //Get text of all the products in product page
  52  |   const allText = await page.locator(".card-body b").allTextContents();
  53  |   console.log("Text of all products in product page are " + allText);
  54  | 
  55  |   //Number of elements with same locator value - '.card-body'
  56  |   const numberOfProductWithSameLocatorValue = await product.count();
  57  |   console.log(
  58  |     "Number of elements with locator value '.card-body' are " +
  59  |       numberOfProductWithSameLocatorValue,
  60  |   );
  61  | 
  62  |   //Iterate over all products in product page to see the text 'ZARA COAT 3'. Corresponding to this text click on ADD TO CART
  63  |   for (let i = 0; i < numberOfProductWithSameLocatorValue; i++) {
  64  |     const itemText = await product.nth(i).locator("b").textContent();
  65  |     console.log(itemText);
  66  |     if (itemText === productName) {
  67  |       //Use a new CSS locator value - TEXT locator can be used in CSS when there is a inner text
  68  |       //Click on the ADD TO CART button
  69  |       await product.nth(i).locator("text =  Add To Cart").click();
  70  |     }
  71  |   }
  72  | 
  73  |   //Click on the CART MENU LINK
  74  |   await page.locator("[routerlink*='cart']").click();
  75  | 
  76  |   //MY CART PAGE
  77  |   //Page changes so wait for the DOM of My Cart in MY CART page
  78  |   await page.locator("div li").first().waitFor();
  79  | 
  80  |   //Assert the text ZARA COAT 3 is visible in the MY CART PAGE
  81  |   //Another way  - TEXT locator can be used in CSS when there is a inner text
  82  |   const boolVal = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  83  |   expect(boolVal).toBeTruthy();
  84  | 
  85  |   //Click on CHECKOUT button
  86  |   //TEXT locator can be used in CSS when there is a inner text - Checkout
  87  |   await page.locator("text = Checkout").click();
  88  | 
  89  |   //Wait for netwrok calls to be over - Page changing after checkout button clicked  -PAYMENT METHOD PAGE COMES
  90  |   await page.waitForLoadState("networkidle");
  91  | 
  92  |   //PAYMENT METHOD PAGE
  93  |   //Assert that the text CREDIT CARD NUMBER is present
  94  |   await expect(page.locator("text=Credit Card Number ")).toHaveText(
  95  |     "Credit Card Number ",
  96  |   );
  97  | 
  98  |   //Clear and type the credit card number
  99  |   await page.locator(".field input.text-validated").fill("");
  100 |   await page.locator(".field input.text-validated").fill("4323123454234534");
  101 | 
  102 |   //Assert the EXPIRY DATE IS VISIBLE
  103 |   expect(await page.locator("text=Expiry Date ").isVisible()).toBeTruthy();
  104 | 
  105 |   //Click on the month drop down created by SELECT tag. Select 03 as the month from the options
  106 |   const month = page.locator("select.ddl").first();
  107 |   await month.selectOption("03");
  108 | 
```