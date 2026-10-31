export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const option = document.createElement("option");
          option.textContent = name;
          option.value = name;
          return option;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action && action.name === "clear") {
      const input = action.parentElement.querySelector("input");
      input.value = "";
      state[action.dataset.field] = "";
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (
        elements[key] &&
        ["INPUT", "SELECT"].includes(elements[key].tagName) &&
        elements[key].value
      ) {
        // ищем поля ввода в фильтре с непустыми данными
        filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
