
// button target 

const addBtn = document.getElementById("addTaskBtn");

////  Input & List Elements

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Save tasks to localStorage
function saveTasks(){
    const tasks =[];
    document.querySelectorAll("li").forEach(li=>{
         tasks.push({
              text:li.textContent,
              completed:li.classList.contains("completed"),
         });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
// Load tasks from localStorage
function loadTasks(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task =>{
         const li = document.createElement("li");
         li.textContent = task.text;
         if (task.completed) {
         li.classList.add("completed");
         }
          // ✅ click event
        li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks(); // save change
       });
       // ❌ delete on double-click
       li.addEventListener("dblclick", function () {
       li.remove();
       saveTasks(); // remove from storage
       });
       taskList.appendChild(li);
     });
}

//  Add Button- click event 

addBtn.addEventListener("click",function(){
    const taskText = taskInput.value.trim();// extra space remove
    if(taskText !== ""){
        //create list li
        const li = document.createElement("li");
        li.textContent = taskText ;
        // ✅ Click -> complete 
        li.addEventListener("click",function(){
           li.classList.toggle("completed");
             saveTasks();
        });
        // ❌ Double-click
        li.addEventListener("dblclick",function(){
           li.remove();
             saveTasks();
        });
        //  Task- list-add 
        taskList.appendChild(li);
        // Step 6: Input clear
        taskInput.value = "";
          saveTasks();
    
          

    }else{
        alert("any letter enter inbox");
    }
});

// Step 1: Get search input element
const searchInput = document.getElementById("searchInput");
// Step 2: Listen for input change
searchInput.addEventListener("input", () => {
const searchText = searchInput.value.toLowerCase();

// All <li> elements
 document.querySelectorAll("#taskList li").forEach(li => {
    const taskText = li.textContent.toLowerCase();

    if (taskText.includes(searchText)) {
      li.style.display = "block"; // Show
    } else {
      li.style.display = "none";  // Hide
    }
  });
});
// Step 1: Toggle Button-
const themeToggleBtn = document.getElementById("themeToggleBtn");
// Step 2: Toggle function
const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
// Save user preference
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
 // Change button icon/text
  themeToggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

};
// Step 3: Click Event
themeToggleBtn.addEventListener("click", toggleTheme);
// Step 4: On page load – Load theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️ Light Mode";
}
// ✅ API- tasks load  function
function loadTasksFromAPI() {
  fetch("https://dummyjson.com/todos")
    .then(response => response.json())
    .then(data => {
      const todos = data.todos.slice(0, 5); // First 5 tasks
      todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.todo;

        if (todo.completed) {
          li.classList.add("completed");
        }

        li.addEventListener("click", () => {
          li.classList.toggle("completed");
          saveTasks();
        });

        li.addEventListener("dblclick", () => {
          li.remove();
          saveTasks();
        });

        taskList.appendChild(li);
        saveTasks();
      });
    })
    .catch(error => {
      console.error("error:", error);
    });
}

const loginSection = document.getElementById("loginSection");
const todoSection = document.getElementById("todoSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const usernameInput = document.getElementById("usernameInput");

// 🔐 Login Logic
loginBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username !== "") {
    localStorage.setItem("user", username);
    showToDoApp();
  } else {
    alert("Please enter a name!");
  }
});

// 🚪 Logout Logic
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  showLogin();
});

// 🔄 Function: Show To-Do App
function showToDoApp() {
  loginSection.style.display = "none";
  todoSection.style.display = "block";
  loadTasks(); // localStorage tasks
  loadTasksFromAPI(); // Optional API tasks
}

// 🔄 Function: Show Login Form
function showLogin() {
  loginSection.style.display = "block";
  todoSection.style.display = "none";
}

// ⏳ On Page Load: Check login
if (localStorage.getItem("user")) {
  showToDoApp();
} else {
  showLogin();
}

function createTaskElement(taskText, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  li.draggable = true; // ✅ Drag support
  if (isCompleted) li.classList.add("completed");

  // ✅ Click & double click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.addEventListener("dblclick", () => {
    li.remove();
    saveTasks();
  });

  // ✅ Drag Events
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragover", dragOver);
  li.addEventListener("drop", drop);

  return li;
}

let draggedItem = null;

function dragStart(e) {
  draggedItem = this;
}

function dragOver(e) {
  e.preventDefault(); // 🛑 Default prevent important!
}

function drop(e) {
  e.preventDefault();
  if (draggedItem !== this) {
    const parent = this.parentNode;
    const children = Array.from(parent.children);
    const draggedIndex = children.indexOf(draggedItem);
    const droppedIndex = children.indexOf(this);

    if (draggedIndex < droppedIndex) {
      parent.insertBefore(draggedItem, this.nextSibling);
    } else {
      parent.insertBefore(draggedItem, this);
    }

    saveTasks(); // 💾 Save new order!
  }
}
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
}

//JavaScript – Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");

// ✅ Theme Toggle on Click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Save preference
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// ✅ On Page Load – Check saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});

//Add Task Notification (Simple)

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = createTaskElement(taskText);
    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();

    // 🔔 Notification
    alert("✅ Task Added: " + taskText);
  }
}
//Countdown Timer (Optional Step)

function addTask() {
  const taskText = taskInput.value.trim();
  const dueDate = document.getElementById("dueDateInput").value;

  if (taskText !== "") {
    const li = createTaskElement(taskText);
    if (dueDate) {
      const timeSpan = document.createElement("span");
      timeSpan.style.fontSize = "12px";
      timeSpan.style.marginLeft = "10px";
      timeSpan.textContent = getCountdown(dueDate);
      li.appendChild(timeSpan);

      // Auto update every 1 minute
      setInterval(() => {
        timeSpan.textContent = getCountdown(dueDate);
      }, 60000);
    }

    taskList.appendChild(li);
    taskInput.value = "";
    saveTasks();
  }
}

function getCountdown(due) {
  const now = new Date();
  const end = new Date(due);
  const diff = end - now;

  if (diff < 0) return "🕓 It's over!";
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const leftMin = mins % 60;
  return `🕒 ${hrs} Hours ${leftMin} Minutes left`;
}
//Progress Bar – Task Completion 
function updateProgress() {
  const tasks = taskList.querySelectorAll("li");
  const completed = taskList.querySelectorAll("li.completed");
  const percent = tasks.length ? (completed.length / tasks.length) * 100 : 0;

  document.getElementById("progressBar").value = percent;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({ text: li.textContent.replace(/🕒.*/, '').trim(), completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateProgress(); // ✅ Update progress
}
//clearTasks button logic

const clearButton = document.getElementById("clearTasks");

clearButton.addEventListener("click", () => {
  const confirmClear = confirm("Do you clear all tasks?");
  if (confirmClear) {
    taskList.innerHTML = ""; // UI-இல் எல்லா task-களையும் நீக்கு
    localStorage.removeItem("tasks"); // LocalStorage-ல இருந்து clear பண்ணு
    updateProgress(); // Progress Bar reset
  }
});


loadTasksFromAPI();
loadTasks();

