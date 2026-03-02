# Automation Testing Framework (ATF)

## Table of Contents

1. [About Automation Testing Framework](#1-about-automation-testing-framework)
2. [Tools Recommended](#2-tools-recommended)
   - [Visual Studio Code](#visual-studio-code)
   - [Node.js](#nodejs)
   - [Git Bash](#git-bash)
3. [Tech Stack](#3-tech-stack)
4. [Knowledge Recommended](#4-knowledge-recommended)
5. [Conventions](#5-conventions)
6. [Project Global Structure](#6-project-global-structure)
   - [Folder Breakdown](#project-global-structure)
   - [Other Files](#other-files)
7. [Installation](#7-install-automation-testing-framework)
8. [How to run a test](#8-how-to-run-a-test)
   - [Locally](#Locally)
   - [Remotely (with jenkins)](#remotely-with-jenkins)
9. [Generating HTML Reports](#9-how-to-generate-the-html-report)
10. [Executing Linters](#10-how-to-execute-the-linters)
11. [Test Design](#11-test-design)
    - [Gherkin Keywords](#keywords)
    - [Background Steps](#background)
    - [Step Tenses](#steps-tense)
    - [Scenario Outlines](#scenario-outline)
    - [Splitting Actions](#split-actions)
    - [Targeting Precise Behaviors](#targeting-a-precise-behavior)
    - [User Management in Automated Tests](#users-usage-in-automated-test)

## 1. About Automation Testing Framework

Automation Testing Framework is an automated framework designed to automate test cases from snow and rock platform with BDD approach

# 2. Tools Recommended

- visual studio code [https://code.visualstudio.com/]
- node.js [https://nodejs.org/en]
- git bash [https://git-scm.com/downloads]

# 3. Tech Stack

- Cypress
- Cucumber
- Javascript
- Typescript
- Lint
- Gitlab

# 4. Knowledge Recommended

**Git**

- merge request
- branch
- rebase

**Typescript/Cypress**

- identify locators in DOM
- create, save and reuse variables
- how to make an api call
- how to identify an api call from ui
- how to click/fill in a locator
- hooks
- explicit vs implicit waits
- assertions
- environment variables

**Cucumber**

- how should a test be written
- tags
- cucumber report

# 5. Conventions

- Flow automation and not rule automation
- Each test as a single goal
- The tests are 100% independent. They must to create all data that need and delete all data created at the end of the test
- The master pipeline must always be green. If something is failing, the fix should be priority
- A new test is added to master branch only if all tests are passing in merge request build
- Comment out code is forbidden
- Use strict timeout as last resort
- SOLID principles

## 6. Project global structure

```
📂 AUTOMATION TESTING FRAMEWORK
 ├── 📂 cypress
 |   ├── 📂 e2e/features
 ├── 📂 support
 |   ├── 📂 configuration
 |        ├── 📂 api
 |        ├── 📂 data
 |        ├── 📂 locators
 |   ├── 📂 pages
 |   ├── 📂 step_definitions
 |   ├── 📂 utils
 ├── .cypress.config.ts
 ├── cypress.env.json
 ├── package.json
 ├── README.md
```

They are four main folders : configuration, pageModel, steps and features.

The **features** folder contains one feature file for each ui page. In each file there are several test cases.
The tests must be written in an understandable English with Gherkin.

The **configuration** folder splits in data and locators. In locators folder should have all locators needed and should be organized by page. The same logic is applied to data not confidential.
**IMPORTANT**: all configuration must be under those files. It´s forbidden uses feature files to set data

The **pageModel** folder is designed to develop all functions needed to reach the goal of each cucumber step.

The **steps_definitions** folder contains all cucumber step implementation according what was wrote in feature files.

### Other files

- **cypress.env.json**: is configured all sensitive information that should not be visible in git repository.
This file never should be committed. I just did it for evaluation purposes.

# 7. Install Automation Testing Framework

Open terminal and execute the following command (is highly recommended use git bash instead of powershell):

```
npm install
```

# 8. How to run a test

## Locally

Before to run some test it needs have .env file with all confidential data.

After .env file configured it just needed run the following command:

```
npm run cy:run
```

To run tests headed:

```
npm run cy:headed
```

# 9. How to generate the html report

To run and generate report, execute the following command:

```
npm run allure:generate
npm run allure:open

```

# 11. Test design

Writing test cases in a correct way requires you to respect some easy rules. Our test cases are written with **Gherkin** syntax (https://cucumber.io/docs/gherkin/reference/).

All scenario and steps name should start with a lowercase letter.

### Keywords

Gherkin as three main keywords for steps:

- **Given** for prerequisites steps
- **When** for actions steps
- **Then** for expectations steps

In addition Gherkin also has two keywords that can replace main keywords in the feature file to link the steps and keep a readable test case:

- **And** to link steps using the same keyword
- **But** to link steps using the same keyword but where the result is the opposite of the previous steps

Keywords shouldn't be mixed: You should have this order of keywords: Given, When, Then.
Note that a test couldn't have any **Given** steps if there is no prerequisites and in some rare cases it could happen that a test has no **When** steps.

E.g.:

```gherkin
Scenario: a user logs in
  Given a user opened the login form
  When the user fills the login form
  And the user validates the login form
  Then the user name should be displayed
  But the login button shouldn't be displayed
```

### Background

If all tests of your feature share some common steps, you can put them in a background.
All background steps should be of **Given** type.

E.g.:

```gherkin
Background:
  Given the website is displayed
  And the user accepted the cookies

Scenario: a user logs in
  Given a user opened the login form
  When the user fills the login form
  And the user validates the login form
  Then the user name should be displayed
  But the login button shouldn't be displayed
```

### Steps tense

Each type of step has its own tense rule.

- **Given** steps should be written in **past** tense most of the time as they represent prerequisites actions that have to be donne for the test's main action to be executed. But sometimes when the step is written in a passive way, given steps could be written in **present** tense
- **When** steps have to be written in **present** tense as they represent the main actions that will be performed in the test
- **Then** steps have to be written in **conditional** tense as the represent an expected behavior that could be not right when tested

If you have a step that is defined in a certain type and could be used as another type in another test, the step should be duplicated and written with the type format.

E.g.:

```gherkin
Scenario: a user logs in
  Given a user opened the login form
  When the user fills the login form
  And the user validates the login form
  Then the user should be logged in

Scenario: a user logs out
  Given a user is logged in
  When the user clicks the log out button
  Then the user shouldn't be logged in
```

### Scenario outline

In some cases, a scenario can be used for several test cases with only some variations. In such a situation you can use a Scenario outline which will allow you to execute tests with parameters. To do that, you'll have to use create a **Scenario Outline** instead of a **Scenario** and define your parameters into your steps by putting them between **<>** (parameters should be written in pascal case).
Then you'll have the define the parameters combinations in the **Examples** section.

E.g.:

```gherkin
Scenario Outline: a user <userStatus> logs in
  Given a user opened the login form
  When the user fills the login form
  And the user validates the login form
  Then the user <loginResult> be logged in

  Examples:
  | userStatus | loginResult |
  | valid      | should      |
  | invalid    | shouldn't   |
```

### Split actions

When writing steps you should keep in mind that a step should target a specific action. If when writing a step you have several actions, then you should surely split it.

E.g.:

```gherkin
Scenario: user login
  Given a user opened the login form
  When the user fills the login form and validates the login form
  Then the user should be logged in
```

Is wrong because the **When** step has two actions. It should be:

```gherkin
Scenario: user login
  Given a user opened the login form
  When the user fills the login form
  And the user validates the login form
  Then the user should be logged in
```

### Targeting a precise behavior

Test cases should be as specific as possible. It means that a test should check one precise behavior. It makes the validation easier and in case of failure, it's clearer what to recheck.

E.g.:
Bad test case:

```gherkin
Scenario: a user starts game and put it in favorite
  Given a user is logged
  When the user launches a game
  And the user marks the game as favorite
  Then the game should be added in the favorite list
```

Good test cases:

```gherkin
Scenario: a user starts game
  Given a user is logged
  When the user launches a game
  Then the game should have started

Scenario: a user marks a game as favorite
  Given a user is logged
  When the user marks the game as favorite
  Then the game should be added in the favorite list
```
