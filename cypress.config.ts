import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.snowandrock.com",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      allure: true,
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      return config;
    },
  },
});
