import HomePage from "../support/pages/HomePage";
import LoginPage from "../support/pages/LoginPage";

const homePage = new HomePage()
const loginPage = new LoginPage()

Cypress.Commands.add("login", () => {
  homePage.goToLogin();
  cy.fixture("users.json").then((users) => {
    const user = users.users[3];

    loginPage.fillForm(user.username, user.password);
    loginPage.submitForm();
  });
});
