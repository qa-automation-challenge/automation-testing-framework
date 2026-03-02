import {
  pageViewEndpoint,
  productAvailabilityEndpoint,
  productCodeEndpoint,
} from "../configuration/api/homepage";
import { registrationButtons } from "../configuration/locators/registration";
import {
  basketModal,
  product,
  shoppingButtons,
  shoppingFields,
} from "../configuration/locators/shopping";
import { closeCampaignPopup } from "../utils/popUps";
import { BasePage } from "./BasePage";

export class ShoppingPage extends BasePage {
  searchForProduct(product: string) {
    const productToSearch = `${product}{enter}`;
    this.type(shoppingFields.search, productToSearch);
    this.waitForRequest("POST", pageViewEndpoint, 202);
  }

  selectFirstProduct() {
    closeCampaignPopup();
    this.get(product).first().should("be.visible").click();
    closeCampaignPopup();
    this.waitForRequest("POST", pageViewEndpoint, 202);
  }

  addProductToBasket() {
    cy.wait(2000);
    this.get(shoppingButtons.addToBasket).first().should("be.visible").click();
  }

  assertProductAddedToBasket() {
    this.waitForRequest("GET", productAvailabilityEndpoint, 202);
    this.get(basketModal).should("be.visible");
  }
}
