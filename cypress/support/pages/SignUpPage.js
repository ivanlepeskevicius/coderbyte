class SignUpPage {
    fillForm(username, password) {
      cy.get(userNameInput).type(username)
      cy.get(passwordInput).type(password)
      .invoke('attr', 'value')
      .then(value => {
        if (value != password) {
          cy.get(passwordInput).clear().wait(200).type(password)
        }  
      })
    }
  
    submitForm() {
      cy.get(signUpBtn).click()
    }
  
    verifyModalAppears() {
      cy.get(signInModal).should('be.visible')
    }

    verifyModalIsClosed() {
      cy.get(signInModal).should('not.be.visible')
    }

    verifySuccessfullSignUp() {
      cy.wait('@signup').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Sign up successful.')
      })
    }

    verifyFailedSignUp() {
      cy.wait('@signup').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('This user already exist.')
      })
    }
  }
  
  export default SignUpPage
  
  export const userNameInput = '#sign-username'
  export const passwordInput = '#sign-password'
  export const signInModal = '#signInModal'
  export const signUpBtn = '#signInModal .btn-primary'