/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-constructor */
/* eslint-disable max-classes-per-file */
import card0 from "../assets/images/amazingcards/0.jpg";
import card1 from "../assets/images/amazingcards/1.jpg";
import card2 from "../assets/images/amazingcards/2.jpg";
import card3 from "../assets/images/amazingcards/3.jpg";
import card4 from "../assets/images/amazingcards/4.jpg";
import card5 from "../assets/images/amazingcards/5.jpg";
import card6 from "../assets/images/amazingcards/6.jpg";
import card7 from "../assets/images/amazingcards/7.jpg";
import card8 from "../assets/images/amazingcards/8.jpg";

import { createElement as createDOMElement } from "./utils.js";
import { gameState, resetValues, endGame } from "./app.js";

export class Card {
  constructor(container, cardNumber, flipCallback) {
    this.card = this.createElement(container);
    this.cardNumber = cardNumber;
    this.flipCallback = flipCallback;
  }

  createElement(container) {
    const card = createDOMElement("li", ["list-item"]);
    const cardFront = createDOMElement("div", ["card-front"]);
    const cardBack = createDOMElement("div", ["card-back"]);
    card.append(cardFront, cardBack);
    container.append(card);

    card.addEventListener("click", () => {
      this.flipCallback(this);
      this.open = this.cardNumber;
    });

    return card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    const cardBack = this.card.querySelector(".card-back");
    if (cardBack) {
      cardBack.textContent = value;
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }
  // eslint-disable-next-line lines-between-class-members
  set open(value) {
    if (gameState.isWaiting || value === gameState.firstPick) return;
    this.card.classList.toggle("card-is-flipped");
    this._open = value;

    if (!gameState.firstPick) {
      gameState.firstPick = this.card;
      gameState.firstNumber = this.cardNumber;
    } else {
      gameState.secondPick = this.card;
      gameState.secondNumber = this.cardNumber;

      this.success = this.cardNumber;
    }
  }

  get open() {
    return this._open;
  }

  // eslint-disable-next-line class-methods-use-this
  set success(value) {
    if (gameState.firstNumber === value) {
      new Promise((resolve) => {
        setTimeout(() => {
          gameState.firstPick.id = "js-finded";
          gameState.secondPick.id = "js-finded";

          gameState.firstPick.replaceWith(gameState.firstPick.cloneNode(true));
          gameState.secondPick.replaceWith(
            gameState.secondPick.cloneNode(true),
          );
          resolve();
        }, 200);
      }).then(() => {
        gameState.matchCounter++;

        if (gameState.matchCounter === gameState.numberOfPairs) {
          endGame();
        }
        resetValues();
      });
    } else {
      gameState.isWaiting = true;
      setTimeout(() => {
        gameState.firstPick.classList.remove("card-is-flipped");
        gameState.secondPick.classList.remove("card-is-flipped");
        resetValues();
      }, 1000);
    }
  }

  get success() {
    return this._success;
  }
}

export class AmazingCard extends Card {
  constructor(container, cardNumber, flipCallback) {
    super(container, cardNumber, flipCallback);
  }

  set cardNumber(value) {
    this._cardNumber = value;
    const cardBack = this.card.querySelector(".card-back");
    if (cardBack) {
      cardBack.textContent = "";
      const cardsImgArray = [
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7,
        card8,
      ];

      const img = createDOMElement("img", ["card-img"]);
      img.src = cardsImgArray[this.cardNumber - 1];
      img.onerror = () => (img.src = card0);

      cardBack.appendChild(img);
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
