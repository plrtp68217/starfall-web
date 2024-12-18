/**
 * Удаляет все дочерние элементы из родительского элемента кроме элемента - исключения.
 * @param {string} parent - Родительский элемент.
 * @param {string} exception - Элемент - исключение.
 * @example
 * // Пример использования:
 * removeChilds('.gamebar', '#new')
 */
export const removeChilds = (parent, exception) => {
    const parentElement = document.querySelector(parent);
    const exceptionElement = document.querySelector(exception);

    Array.from(parentElement.childNodes).forEach(child => {
        if (child !== exceptionElement) {
          parentElement.removeChild(child);
        }
      });
}