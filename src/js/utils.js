/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-import-module-exports
export function createElement(tag, classNames, textContent) {
  const element = document.createElement(tag);

  if (classNames) {
    element.classList.add(...classNames);
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}
