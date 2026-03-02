import { Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { RegistrationPage } from "../pages/RegistrationPage";

const registrationPage = new RegistrationPage();

When("the user inserts valid registration details", () => {
  registrationPage.insertRegistrationDetails();
});

When("the user clicks in create account button", () => {
  registrationPage.clickCreateAccount();
});

Then("the user should be redirected to registration confirmation page", () => {
  registrationPage.assertRegistrationUrlSuccess();
});
