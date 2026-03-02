import { pageViewEndpoint } from "../configuration/api/homepage";
import { loginButtons, LoginLinks, loginsFields } from "../configuration/locators/login";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  open() {
    this.visit("/");
    this.waitForRequest("POST", pageViewEndpoint, 202);
  }

  insertLoginCredentials(emailInput: string, passwordInput: string) {
    this.type(loginsFields.email, emailInput);
    this.type(loginsFields.password, passwordInput);
  }

  submitLogin() {
    this.click(loginButtons.submit);
    this.waitForRequest("POST", pageViewEndpoint, 202);
  }

  openRegistrationForm() {
    this.click(LoginLinks.joinNow);
  }
}
