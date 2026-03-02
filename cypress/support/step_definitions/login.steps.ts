import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

const loginPage = new LoginPage();
const homePage = new HomePage();

Given("the user is on the homepage", () => {
  loginPage.open();
  homePage.acceptCookies();
});

Given("the user is logged on the homepage", () => {
  const email = Cypress.env("MAIN_USER_EMAIL");
  const password = Cypress.env("MAIN_USER_PASSWORD");

  loginPage.open();
  homePage.acceptCookies();
  homePage.expandLoginForm();
  loginPage.insertLoginCredentials(email, password);
  loginPage.submitLogin();
});

When("the user expands the login form", () => {
  homePage.expandLoginForm();
});

When("the user inserts valid credentials", () => {
  const email = Cypress.env("MAIN_USER_EMAIL");
  const password = Cypress.env("MAIN_USER_PASSWORD");

  loginPage.insertLoginCredentials(email, password);
  loginPage.submitLogin();
});

When("the user clicks in join now link", () => {
  loginPage.openRegistrationForm();
});

Then("the user should be logged in", () => {
  homePage.assertAccountIsVisible();
});
