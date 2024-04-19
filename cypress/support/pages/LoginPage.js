class LoginPage {
    fillForm(username, password) {
      cy.get(userNameInput).type(username)
      .invoke('attr', 'value')
      .then(value => {
        if (value != username) {
          cy.get(userNameInput).clear().wait(200).type(username)
        }  
      })
      cy.get(passwordInput).type(password)
      .invoke('attr', 'value')
      .then(value => {
        if (value != password) {
          cy.get(passwordInput).clear().wait(200).type(password)
        }  
      })
    }
  
    submitForm() {
      cy.get(logInBtn).click()
    }
  
    verifyLoginFailed() {
      cy.get(logInModal).should('be.visible')
    }

    verifySuccessfullLogIn() {
      cy.wait('@login').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Log in successful.')
      })
    }

    verifyWrongPasswordMessage() {
      cy.wait('@login').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Wrong password.')
      })
    }

    verifyInvalidUserMessage() {
      cy.wait('@login').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('User does not exist.')
      })
    }
  }
  
  export default LoginPage
  
  export const userNameInput = '#loginusername'
  export const passwordInput = '#loginpassword'
  export const logInModal = '#logInModal'
  export const logInBtn = '#logInModal .btn-primary'