import { When, Then } from "@badeball/cypress-cucumber-preprocessor"
import { ShoppingPage } from "../pages/ShoppingPage"

const shoppingPage = new ShoppingPage()


When("the user searches for {string}", (product: string) => {
  shoppingPage.searchForProduct(product);
})

When("the user selects the first product", () => {
  shoppingPage.selectFirstProduct();
})

When("the user clicks on add to basket button", () => {
  shoppingPage.addProductToBasket();
})

Then("the basket addition pop should be displayed", () => {
  shoppingPage.assertProductAddedToBasket();
})