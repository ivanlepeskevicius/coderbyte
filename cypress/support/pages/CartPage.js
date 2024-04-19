class CartPage {
    addItem(product) {
      cy.get(item).contains(product).click()
    }
  
    removeItem(product) {
      cy.contains(item, product).contains(deleteBtn).click()
      cy.wait('@deleteItem').its('response.statusCode').should('eq', 200)
    }
  
    placeOrder() {
      cy.get(placeOrderBtn).click()
    }
  
    fillOrderForm(name, country, city, card, month, year) {
      cy.get(nameInput).type(name)
      cy.get(countryInput).type(country)
      cy.get(cityInput).type(city)
      cy.get(cardInput).type(card)
      cy.get(monthInput).type(month)
      cy.get(yearInput).type(year)
    }
  
    submitOrder() {
      cy.get(orderModalBtn).click()
      cy.wait('@orderSuccess').its('response.statusCode').should('eq', 200)
      cy.get(successModal).should('be.visible')
      cy.get(successModalTitle).should('have.text', 'Thank you for your purchase!')
    }
  
    verifyOrderConfirmation(name, amount, cardNbr) {
      cy.get(successModalDetailText).should('contain', name)
      cy.get(successModalDetailText).should('contain', amount)
      cy.get(successModalDetailText).should('contain', cardNbr)
    }
  }
  
  export default CartPage
  
  export const item = '.success'
  export const deleteBtn = 'Delete'
  export const placeOrderBtn = '.btn-success'
  export const nameInput = '#name'
  export const countryInput = '#country'
  export const cityInput = '#city'
  export const cardInput = '#card'
  export const monthInput = '#month'
  export const yearInput = '#year'
  export const orderModalBtn = '#orderModal .btn-primary'
  export const successModal = '.sweet-alert'
  export const successModalTitle = '.sweet-alert > h2'
  export const successModalDetailText = '.lead'