const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const formSearch = document.querySelector(".form-search");

const filterTodos = (todos, searchedValue, returnMatchedTodos) =>
  todos.filter((todo) => {
    const matchedTodos = todo.textContent.toLowerCase().includes(searchedValue);
    return returnMatchedTodos ? matchedTodos : !matchedTodos;
  });

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach((todo) => {
    todo.classList.remove(classToRemove);
    todo.classList.add(classToAdd);
  });
};

const hideTodos = (todos, searchedValue) => {
  const todosToHide = filterTodos(todos, searchedValue, false);
  manipulateClasses(todosToHide, "hidden", "d-flex");
};

const showTodos = (todos, searchedValue) => {
  const todosToShow = filterTodos(todos, searchedValue, true);
  manipulateClasses(todosToShow, "d-flex", "hidden");
};

const addTodoToContainer = (todo) => {
  if (todo.length) {
    todosContainer.innerHTML += `
    <li class="bg-dark border-warning list-group-item d-flex justify-content-between align-items-center" data-todo="${todo}">
      <span>${todo}</span>
      <i class="text-danger far fa-trash-alt" data-trash="${todo}"></i>
    </li>`;
  }
};

const removeTodo = (clickedElement) => {
  const trashDataValue = clickedElement.dataset.trash;
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

  if (trashDataValue) {
    todo.remove();
  }
};

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();

  addTodoToContainer(inputValue);

  event.target.reset();
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  removeTodo(clickedElement);
});

formSearch.addEventListener("input", (event) => {
  const inputValue = event.target.value.toLowerCase();
  const todosArray = Array.from(todosContainer.children);

  showTodos(todosArray, inputValue);
  hideTodos(todosArray, inputValue);
});
