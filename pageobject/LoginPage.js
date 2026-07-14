class LoginPage {
  //Create a constructor to use the same 'page' context'
  //The constructor should all the locators of all element present in the page
  constructor(page) {
    this.page = page;
    this.username = this.page.locator("#userEmail");
    this.password = this.page.locator("#userPassword");
    this.login = this.page.locator('input[id="login"]');
  }

  async goToUrl() {
    //Navigate to practise  page
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(username, password) {
    //Type on with correct username
    await this.username.fill(username);

    //Type the correct password
    await this.password.fill(password);

    //Click on Sign in button - different CSS locator
    await this.login.click();

    //Wait for netwrok class to be over as the page changes - Can be used only when web services are used
    //await this.page.waitForLoadState("networkidle");
  }
}

module.exports = { LoginPage };
