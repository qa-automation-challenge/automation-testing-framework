import {
  registrationInputs,
  urlConfirmRegistration,
} from "../configuration/data/registration";
import {
  registrationButtons,
  registrationCheckboxes,
  registrationDropdowns,
  registrationFields,
} from "../configuration/locators/registration";
import { generateEmail } from "../utils/dataGenerator";
import { closeCampaignPopup } from "../utils/popUps";
import { BasePage } from "./BasePage";

export class RegistrationPage extends BasePage {
  insertRegistrationDetails() {
    const emailInput = generateEmail();
    closeCampaignPopup()
    this.type(registrationFields.email, emailInput);
    cy.get(registrationFields.email).focus().blur();
    cy.contains("button", "Ignore").click();
    this.type(registrationFields.password, registrationInputs.password);
    this.type(registrationFields.confirmPassword, registrationInputs.password);
    this.select(registrationDropdowns.title, registrationInputs.mrTitle);
    this.check(registrationCheckboxes.gender);
    this.type(registrationFields.firstName, registrationInputs.firstName);
    this.type(registrationFields.lastName, registrationInputs.lastName);
  }

  clickCreateAccount() {
    this.click(registrationButtons.createAccount);
  }

  assertRegistrationUrlSuccess() {
    cy.url().should("include", urlConfirmRegistration);
  }
}
