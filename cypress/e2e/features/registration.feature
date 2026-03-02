@registration
Feature: Registration

  @deleteUser
  Scenario: Successful registration
    Given the user is on the homepage
    When the user expands the login form
    And the user clicks in join now link
    And the user inserts valid registration details
    And the user clicks in create account button
    Then the user should be redirected to registration confirmation page