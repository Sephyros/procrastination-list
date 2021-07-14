const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const formSearch = document.querySelector(".form-search");

const showMatchingTodos = (todoArray, searchedValue) => {
  const matchingTodos = todoArray.filter(
    (todo) => !todo.textContent.toLowerCase().includes(searchedValue)
  );
  matchingTodos.forEach((todo) => {
    todo.classList.remove("d-flex");
    todo.classList.add("hidden");
  });
};

const hideUnwantedTodos = (todoArray, searchedValue) => {
  todoArray
    .filter((todo) => todo.textContent.toLowerCase().includes(searchedValue))
    .forEach((todo) => {
      todo.classList.add("d-flex");
      todo.classList.remove("hidden");
    });
};

const addTodoToContainer = (todo) => {
  if (todo.length) {
    todosContainer.innerHTML += `
    <li class="bg-dark border-warning list-group-item d-flex justify-content-between align-items-center">
      <span>${todo}</span>
      <i class="text-danger far fa-trash-alt delete"></i>
    </li>`;
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
  if (Array.from(clickedElement.classList).includes("fa-trash-alt")) {
    clickedElement.parentElement.remove();
  }
});

formSearch.addEventListener("input", (event) => {
  const inputValue = event.target.value.toLowerCase();
  const todosArray = Array.from(todosContainer.children);

  showMatchingTodos(todosArray, inputValue);
  hideUnwantedTodos(todosArray, inputValue);
});
