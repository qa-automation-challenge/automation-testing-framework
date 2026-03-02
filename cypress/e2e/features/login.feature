@login
Feature: Login

  Scenario: Successful login
    Given the user is on the homepage
    When the user expands the login form
    And the user inserts valid credentials
    Then the user should be logged in