class APIUtils {
  //Constructor
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getSesssionToken() {
    //Send the request in POST method to the URL https://rahulshettyacademy.com/api/ecom/auth/login
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",

      //Define the payload
      {
        data: this.loginPayLoad,
      },
    );

    //Convert the response from String format to JSON Format
    const loginResponseJSON = await loginResponse.json();

    //https://jsoneditoronline.org/#left=local.qazegi&right=local.lomaja - used to get the JSON path
    const sessionToken = loginResponseJSON.token;
    console.log("Session token is " + sessionToken);
    return sessionToken;
  }

  async getOrderId(orderPayload) {
    let response = {};
    //Calling th getSesssionToken() method to get the session
    response.sessionToken = await this.getSesssionToken();

    //Get the order ID
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        //Define the Payload
        data: orderPayload,

        //Define the request header with authorization key and content type key
        headers: {
          Authorization: response.sessionToken,
          "Content-Type": "application/json",
        },
      },
    );

    //Convert the order response in to JSON format
    const orderResponseJSON = await orderResponse.json();
    response.orderId = orderResponseJSON.orders[0];
    console.log("Order id is " + response.orderId);

    //return the response object
    return response;
  }
}

module.exports = { APIUtils };
