class HomePage {
    visit() {
      cy.visit('/')
    }
  
    goToLogin() {
      cy.get(loginLink).click()
    }
  
    goToSignUp() {
      cy.get(signUpLink).click()
    }
  
    logout() {
      cy.get(logOutBtn).click()
      cy.get(logOutBtn).should('not.be.visible')
      cy.get(loginLink).should('be.visible')
    }
    
    goToCart() {
      cy.get(cartLink).click()
    }
  }
  
  export default HomePage
  
  export const loginLink = '#login2'
  export const signUpLink = '#signin2'
  export const logOutBtn = '#logout2'
  export const cartLink = '#cartur'