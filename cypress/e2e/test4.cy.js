import HomePage from '../support/pages/HomePage'
import CategoryPage from '../support/pages/CategoryPage'

describe('Test 4', () => {
  const homePage = new HomePage()
  const categoryPage = new CategoryPage()

  it("Categories validations", () => {
    homePage.visit()
    cy.login()
    categoryPage.goToMainCategoryLvl()

    categoryPage.countItems('phone').then(phoneCount => {
      cy.log(phoneCount)
      categoryPage.countItems('notebook').then(notebookCount => {
        cy.log(notebookCount)
        categoryPage.countItems('monitor').then(monitorCount => {
          cy.log(monitorCount)
          const subcategoriesTotalCount = phoneCount + notebookCount + monitorCount
          cy.log(subcategoriesTotalCount)

          categoryPage.goToMainCategoryLvl()
          categoryPage.countItems(null, true).then(mainCategoryCount => {
            cy.log(mainCategoryCount)
            assert.equal(mainCategoryCount, subcategoriesTotalCount, "The main category count should be equal to the total count from subcategories")
          })
        })
      })
    })
  })
})

