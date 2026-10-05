import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    // Перебираем по именам
    elements[elementName].append(
      ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
        .map((name) => {
          const option = document.createElement("option");
          option.textContent = name.toString();
          option.value = name.toString();
          return option;
        }),
    );
  });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const input = action.parentElement.querySelector("input");
      input.value = "";
      state[action.dataset.field] = "";
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
