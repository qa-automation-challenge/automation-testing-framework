import { homepageButtons, homepageContainers } from "../configuration/locators/homepage";
import { loginButtons } from "../configuration/locators/login";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private searchInput = 'input[type="search"]';

  search(product: string) {
    this.type(this.searchInput, product + "{enter}");
  }

  acceptCookies() {
    this.click(homepageButtons.acceptCookies);
  }

  expandLoginForm() {
    this.click(loginButtons.login);
  }

  assertAccountIsVisible() {
    this.click(loginButtons.login);
    cy.get(homepageContainers.account).should(
      "be.visible",
    );
  }
}
