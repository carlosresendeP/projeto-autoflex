import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // O endereço do seu Vite
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});