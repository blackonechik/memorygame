/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import createCardsApp from "./app.js";

export const appContainer = document.getElementById("cards-app");

createCardsApp();
