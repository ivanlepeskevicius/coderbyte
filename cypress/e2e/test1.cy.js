import HomePage from '../support/pages/HomePage'
import LoginPage from '../support/pages/LoginPage'
import SignUpPage from '../support/pages/SignUpPage'

describe('Test 1', () => {
  const homePage = new HomePage()
  const loginPage = new LoginPage()
  const signUpPage = new SignUpPage()

  beforeEach(() => {
    cy.intercept('POST', '**/signup').as('signup')
    cy.intercept('POST', '**/login').as('login')
    homePage.visit()
  });
  
  it('Sign Up as a new user', () => {
    cy.fixture('users.json').then((users) => {
      const user = users.users[0]
      // Append a timestamp to the username to ensure it's unique
      const username = user.username + Date.now()
      const password = user.password

      homePage.goToSignUp()
      signUpPage.fillForm(username, password)
      signUpPage.submitForm()
      signUpPage.verifySuccessfullSignUp()
      signUpPage.verifyModalIsClosed()
    })
  })

  it('Validate if you try signup with same user modal will appear', () => {
    homePage.goToSignUp()
    cy.fixture('users.json').then((users) => {
      const user = users.users[0]

    signUpPage.fillForm(user.username, user.password)
    signUpPage.submitForm()
    signUpPage.verifyFailedSignUp()
    signUpPage.verifyModalAppears()
    })
  })

  it('Log in', () => {
    homePage.goToLogin()
    cy.fixture('users.json').then((users) => {
      const user = users.users[2]

    loginPage.fillForm(user.username, user.password)
    loginPage.submitForm()
    loginPage.verifySuccessfullLogIn()
    })
  })

  it.only('Log out', () => {
    homePage.goToLogin()
    cy.fixture('users.json').then((users) => {
      const user = users.users[2]

    loginPage.fillForm(user.username, user.password)
    loginPage.submitForm()
    loginPage.verifySuccessfullLogIn()
    homePage.logout()
    })
  })

  it('Try logging in with invalid user', () => {
    homePage.goToLogin()
    loginPage.fillForm('invaliduser', 'password')
    loginPage.submitForm()
    loginPage.verifyInvalidUserMessage()
    loginPage.verifyLoginFailed()
  })
})
