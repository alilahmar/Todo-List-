// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners (element or variable and event listener type 'click onMouse ...' and Function)
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
todoList.addEventListener("click", editText);

// Functions
function addTodo(event) {
  // prevent form from submit
  event.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  // add to a class to it
  todoDiv.classList.add("todo");
  // Create Li
  const newTodo = document.createElement("li");
  // to display text
  // newTodo.innerText = "hey";
  newTodo.innerText = todoInput.value;

  // add a class to it
  newTodo.classList.add("todo-item");
  // to add newTodo to todoDiv
  todoDiv.appendChild(newTodo);
  // add todo to localStorage
  saveLocalTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement("button");
  // will not work with innerText
  //   completedButton.innerText = '<i class="fas fa-check"></i>';
  // it works with innerHTML
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // Edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  // check trash button
  const trashButton = document.createElement("button");
  // it works with innerHTML
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append todoDiv to the ul
  todoList.appendChild(todoDiv);
  // clear todo input value with reset or give it empty string
  todoInput.value = "";
}

function deleteCheck(e) {
  // anything you click on it
  // console.log(e.target);
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // to remove from localStorage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    // this way can be deleted
    // todo.remove();
  }
  // check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    // check it
    todo.classList.toggle("completed");
  }
}
// Filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  todos.forEach(function (todo) {
    // e.target.value = all, completed or uncompleted
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        // forgot break
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Edit text ----------------------------------------------------------
function editText(e) {
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  if (modalDiv) {
    modalDiv.style.position = "absolute";
    modalDiv.style.top = "0";
  } else {
    modalDiv.style.position = "none";
    modalDiv.style.top = "none";
  }
  const paragraph = document.createElement("input");
  paragraph.classList.add("ipt");
  // paragraph.innerHTML = e.target.parentElement.children[0].textContent;
  paragraph.value = e.target.parentElement.children[0].textContent;
  modalDiv.appendChild(paragraph);

  // console.log("Ali");
  // create buttons for Modal
  const divButton = document.createElement("div");
  divButton.classList.add("divButton");
  modalDiv.appendChild(divButton);
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.innerText = "OK";
  divButton.appendChild(editBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.innerText = "X";

  divButton.appendChild(deleteBtn);
  todoList.appendChild(modalDiv);
  // add the text when click on Ok

  // remove Modal when click on X
  deleteBtn.addEventListener("click", (e) => {
    // const event = e.target.parentElement.parentElement;
    // modalDiv.style.display = "none";
    // event.remove();
    // console.log(event);
    console.log("Ali");
  });
}

// implementing the localStorage
function saveLocalTodos(todo) {
  // check if I already have thing in localStorage
  let todos;
  if (localStorage.getItem("todos") === "null") {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  //check Do I have thing in there !
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    // add to a class to it
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement("li");
    // to display text
    // newTodo.innerText = "hey";
    newTodo.innerText = todo;

    // add a class to it
    newTodo.classList.add("todo-item");
    // to add newTodo to todoDiv
    todoDiv.appendChild(newTodo);

    // check mark button
    const completedButton = document.createElement("button");
    // will not work with innerText
    //   completedButton.innerText = '<i class="fas fa-check"></i>';
    // it works with innerHTML
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    // check trash button
    const trashButton = document.createElement("button");
    // it works with innerHTML
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append todoDiv to the ul
    todoList.appendChild(todoDiv);
  });
}

// remove from LocalStorage
function removeLocalTodos(todo) {
  //check Do I have thing in there !
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // to get the text check it
  const todoIndex = todo.children[0].innerText;
  // console.log(todo.children[0].innerText);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
