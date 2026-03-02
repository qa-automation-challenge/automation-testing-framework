@shopping
Feature: Shopping

  Background:
    Given the user is logged on the homepage

  @deleteProductFromBasket
  Scenario: Search and add a product to basket
    When the user searches for "glasses"
    And the user selects the first product
    And the user clicks on add to basket button
    Then the basket addition pop should be displayed