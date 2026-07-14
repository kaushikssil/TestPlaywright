const { test, expect } = require("@playwright/test");
const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { MyCartPage } = require("./MyCartPage");
const { PaymentMethodPage } = require("./PaymentMethodPage");
const { ThankYouPage } = require("./ThankYouPage");
const { YourOrderPage } = require("./YourOrderPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");

class PageObjectManager {
  constructor(page) {
    this.page = page;
    //Login Page - OBJECT
    this.loginPage = new LoginPage(this.page);
    //Dashboard Page - OBJECT
    this.dashboardPage = new DashboardPage(this.page);
    //MyCartPage Page - OBJECT
    this.myCartPage = new MyCartPage(this.page);
    //PaymentMethodPage Page - OBJECT
    this.paymentMethodPage = new PaymentMethodPage(this.page);
    //ThankYouPage Page - OBJECT
    this.thankYouPage = new ThankYouPage(this.page);
    //YourOrderPage Page - OBJECT
    this.yourOrderPage = new YourOrderPage(this.page);
    //OrderSummaryPage page - OBJECT
    this.orderSummaryPage = new OrderSummaryPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getMyCartPage() {
    return this.myCartPage;
  }

  getPaymentMethodPage() {
    return this.paymentMethodPage;
  }

  getThankYouPage() {
    return this.thankYouPage;
  }

  getYourOrderPage() {
    return this.yourOrderPage;
  }

  getOrderSummaryPage() {
    return this.orderSummaryPage;
  }
}

module.exports = { PageObjectManager };
