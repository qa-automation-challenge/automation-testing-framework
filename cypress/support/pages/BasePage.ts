export class BasePage {
  visit(path: string = "/") {
    cy.visit(path);
    //to avoid popup promotions during tests
    cy.setCookie('0009-storage-key', 'closed');
  }

  click(selector: string) {
    cy.get(selector).should("be.visible").click();
  }

  type(selector: string, text: string) {
    cy.get(selector).should("be.visible").clear().type(text);
  }

  select(selector: string, value: string) {
    cy.get(selector).should("be.visible").select(value);
  }

  check(selector: string) {
    cy.get(selector).should("be.visible").check();
  }

  get(selector: string) {
    return cy.get(selector);
  }

  waitForRequest(method: string, endpoint: string, statusCode: number) {
    cy.intercept(method, endpoint).as("request");
    cy.wait("@request").its("response.statusCode").should("eq", statusCode);
  }
}
