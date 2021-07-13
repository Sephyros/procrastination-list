const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const formSearch = document.querySelector(".form-search");

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();
  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>`;
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
  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("d-flex");
      todo.classList.add("hidden");
    });
  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.add("d-flex");
      todo.classList.remove("hidden");
    });
});
