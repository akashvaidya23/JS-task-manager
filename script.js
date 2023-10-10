let button = document.querySelector('.AddTask');
let tasks = localStorage.getItem('tasks');
tasks = tasks === null ? [] : JSON.parse(tasks);

let myUl = document.querySelector('#task-ul');
let listDiv = document.querySelector("#task-list");
if (tasks.length > 0) {
  appendTasks(tasks);
}

button.addEventListener("click", () => {
  let task = document.querySelector('.task');
  if (task.value !== "") {
    tasks.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    appendTasks(tasks);
    task.value = "";
    task.focus();
  } else {
    alert("Please Enter task name");
    task.focus();
  }
});

function appendTasks(tasks) {
  let listTasks = displayTasks(tasks);
  console.log("appendTask ",listTasks);
  listDiv.innerHTML = null;
  listDiv.appendChild(listTasks);
}

function displayTasks(tasks) {
  let ul = document.createElement('ul');
  tasks.map((task, id) => {
    // console.log("task ", task);
    ul.innerHTML += `<li class="task-li">${task} <button onclick="deleteTask(${id})" class="deleteTask">Delete</button> </li>`;
  });
  return ul;
}

function deleteTask(id) {
  const consent = confirm(`Do you want to delete this task`);
  if (consent) {
    tasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    appendTasks(tasks);
  }
}

function searchTask(text) {
  let filterTasks = tasks.filter((task, id) => {
    return task.toLowerCase().includes(text.toLowerCase());
  });
  return filterTasks;
}

let filteredTasks = searchTask('sing');
document.querySelector('.searchTask').addEventListener('keyup',(e)=>{
  let text = e.target.value;
  let filteredTaksk = searchTask(text);
  console.log(filteredTaksk);
  appendTasks(filteredTaksk);
});