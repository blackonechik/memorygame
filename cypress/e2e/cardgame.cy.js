/* eslint-disable no-use-before-define */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/no-assigning-return-values */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-disabled-tests */

import "cypress-map/commands/sample";

describe("Приложение игры в карточки (Мемори)", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:8080/`);
  });

  it(`В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима`, () => {
    cy.get(".card-back")
      .should("have.length", 16)
      .should(
        `have.css`,
        "transform",
        "matrix3d(-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
      );
  });

  it(`Карточки переворачиваются по клику`, () => {
    cy.get(".list-item").sample().click();
  });

  it(`Нажать на левую верхнюю карточку, затем на следующую. Если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Проверить, что найденная пара карточек осталась видимой.`, () => {
    let tries = 0;

    function tryPair() {
      const firstPick = cy.get(".list-item").eq(0);
      const secondPick = cy.get(".list-item").eq(tries + 1);
      cy.wait(1000);
      firstPick.click();
      secondPick.click();
      cy.wait(500);
      firstPick.then(() => {
        secondPick.then(($secondPick) => {
          if ($secondPick.attr("id") !== "js-finded") {
            tries += 1;
            tryPair();
          } else {
            cy.get(".card-is-flipped").should("have.length", 2);
          }
        });
      });
    }

    tryPair();
  });

  it(`Нажать на левую верхнюю карточку, затем на следующую. Если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки. Проверить, что после нажатия на третью карточку две несовпадающие карточки становятся закрытыми.`, () => {
    let tries = 0;

    function tryFisrtPair() {
      const firstPick = cy.get(".list-item").eq(0);
      const secondPick = cy.get(".list-item").eq(tries + 1);
      cy.wait(1000);
      firstPick.click();
      secondPick.click();
      cy.wait(500);
      firstPick.then(() => {
        secondPick.then(($secondPick) => {
          if ($secondPick.attr("id") !== "js-finded") {
            tries += 1;
            tryFisrtPair();
          } else {
            cy.get(".card-is-flipped").should("have.length", 2);
            trySecondPair();
          }
        });
      });
    }

    function trySecondPair() {
      tries = 0;
      const thirdPick = cy
        .get(".list-item")
        .not(".card-is-flipped")
        .eq(0)
        .as("thirdPick");
      const fourthPick = cy
        .get(".list-item")
        .not(".card-is-flipped")
        .eq(0)
        .as("fourthPick");
      cy.wait(1000);
      thirdPick.click();
      fourthPick.click();
      cy.wait(500);
      thirdPick.then(() => {
        fourthPick.then(($fourthPick) => {
          if ($fourthPick.attr("id") !== "js-finded") {
            cy.get("@thirdPick").should("not.have.class", "card-is-flipped");
            cy.get("@fourthPick").should("not.have.class", "card-is-flipped");
          } else {
            trySecondPair();
          }
        });
      });
    }

    tryFisrtPair();
  });
});
