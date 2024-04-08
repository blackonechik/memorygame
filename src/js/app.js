/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { AmazingCard, Card } from "./cardClass.js";
import { createElement } from "./utils.js";
import { appContainer } from "./main.js";
import "../styles/normalize.css";
import "../styles/style.css";

export const gameState = {
  firstPick: null,
  secondPick: null,
  firstNumber: 0,
  secondNumber: 0,
  matchCounter: 0,
  isWaiting: false,
  numberOfPairs: 8,
};

function createNumbersArray(count) {
  // Генерация массива чисел
  const NUMBERS_ARRAY = [];

  for (let i = 1; i <= count; i++) {
    NUMBERS_ARRAY.push(i, i);
  }
  return NUMBERS_ARRAY;
}

function shuffle(arr) {
  // Генерация массива случайных чисел
  return arr.sort(() => Math.random() - 0.5);
}

function createAppTitle(title) {
  // Создание заголовка
  return createElement("h1", ["title"], title);
}

function createCardsList() {
  // Создание сетки
  const list = createElement("ul", ["list"]);
  list.id = "list";
  return list;
}

export function resetValues() {
  // Обнуление переменных
  [gameState.firstPick, gameState.secondPick] = [null, null];
  [gameState.firstNumber, gameState.secondNumber] = [null, null];
  gameState.isWaiting = false;
}

function startGame(numberOfPairs, container) {
  // Начало игры
  const cardsList = createCardsList();
  container.append(cardsList);

  const randomNumbersList = shuffle(createNumbersArray(numberOfPairs));

  for (const cardNumber of randomNumbersList) {
    const card = new AmazingCard(cardsList, cardNumber, (cardItem) => {
      console.log("Клик по карте", card);
    });
  }
}

export function endGame() {
  // Конец Игры
  const cardsList = document.getElementById("list");
  const container = document.getElementById("cards-app");
  const restartButton = createElement("button", ["btn"], "Начать заново");

  container.append(restartButton);

  restartButton.addEventListener("click", () => {
    resetValues();
    gameState.matchCounter = 0;
    restartButton.remove();

    const foundCardsList = document.querySelectorAll(".list-item");
    for (let i = 0; i < foundCardsList.length; i++) {
      // Переворачивание карточек обратно
      setTimeout(() => {
        foundCardsList[i].classList.remove("card-is-flipped");
      }, i * 100); // увеличиваем задержку на 100 мс для каждой следующей карты
    }
    setTimeout(() => {
      // Удаление ul
      cardsList.remove();
      startGame(8, appContainer);
    }, 1700);
  });
}

export default function createCardsApp(title = "Memory game") {
  // Инициализация самой программы
  const AppTitle = createAppTitle(title);
  appContainer.append(AppTitle);

  startGame(8, appContainer);
}
