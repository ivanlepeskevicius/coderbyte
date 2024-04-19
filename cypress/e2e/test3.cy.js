import HomePage from "../support/pages/HomePage";
import LoginPage from "../support/pages/LoginPage";
import CartPage from "../support/pages/CartPage";
import CategoryPage from "../support/pages/CategoryPage";

describe("Test 2", () => {
  const homePage = new HomePage();
  const cartPage = new CartPage();
  const categoryPage = new CategoryPage();

  const firstPhone = "Nexus";
  const secondPhone = "Iphone";
  const name = "Ivan";
  const country = "Spain";
  const city = "Madrid";
  const cardNbr = "1234 1234 1234 1234 0";
  const month = "June";
  const year = "2024";
  let amount;

  beforeEach(() => {
    cy.intercept("POST", "**/login").as("login");
    cy.intercept("POST", "**/addtocart").as("addedToCart");
    cy.intercept("POST", "**/deleteitem").as("deleteItem");
    cy.intercept("POST", "**/deletecart").as("orderSuccess");
    homePage.visit();
  });
  it("Place an order", () => {
    cy.login();
    categoryPage.goToSubCategory("phone");
    categoryPage.selectProduct(firstPhone);
    categoryPage.addToCart();
    homePage.visit();
    categoryPage.goToSubCategory("phone");
    categoryPage.selectProduct(secondPhone);
    categoryPage.addToCart();
    homePage.goToCart();
    cartPage.removeItem(firstPhone);
    cy.get("#totalp")
      .should('not.be.empty')
      .invoke("text")
      .then((text) => {
        amount = text; 
        cartPage.placeOrder();
        cartPage.fillOrderForm(name, country, city, cardNbr, month, year);
        cartPage.submitOrder();
        cartPage.verifyOrderConfirmation(name, amount, cardNbr);
      });
  });
});
