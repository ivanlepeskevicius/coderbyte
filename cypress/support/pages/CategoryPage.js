class CategoryPage {
    selectProduct(product) {
      cy.get(productCard).contains(product).click()
    }
  
    addToCart() {
      cy.get(addToCartBtn).click()
      cy.wait('@addedToCart').its('response.statusCode').should('eq', 200)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Product added.')
      })
    }
  
    goToMainCategoryLvl() {
      cy.get(mainCategoryBtn).click()
    }
    goToSubCategory(category) {
      cy.get(`[onclick="byCat('${category}')"]`).click()
    }   

    countItems(category, isMainCategory = false) {
      if (isMainCategory) {
        this.goToMainCategoryLvl();
      } else {
        this.goToSubCategory(category);
      }

      const count = () => cy.get(productCard).its('length').then(length => {
        let total = length;
        return cy.get('body').then(body => {
          if (body.find(nextBtn).length > 0) {
            return cy.get(nextBtn).click().wait(1000).then(() => count().then(nextCount => total + nextCount));
          }
          return total;
        });
      });
    
      return count();
    }
  
  }
  
  export default CategoryPage
  
  export const productCard = '.card'
  export const mainCategoryBtn = '#cat'
  export const addToCartBtn = '.btn-success'
  export const nextBtn = '#next2:visible'
  