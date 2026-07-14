const base = require("@playwright/test");

//Extend the base test to include custom data

exports.customTest = base.test.extend({
  testDataForOrder: {
    username: "kaushik.aryaan@gmail.com",
    password: "Test@1234",
    productName: "ZARA COAT 3",
    countryName: " India",
    countryInitial: "ind",
  },
});
