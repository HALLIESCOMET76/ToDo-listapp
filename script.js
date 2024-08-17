// Global Variables
let tasks = [];
let currentUser = null;

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
});

// Check if the user is logged in
function checkLogin() {
    currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        tasks = userData.tasks || [];
        displayTodoList();
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
    }
}

// User Signup
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(username)) {
        alert("Username already exists!");
    } else {
        localStorage.setItem(username, JSON.stringify({ password: password, tasks: [] }));
        alert("Signup successful! Please log in.");
    }
}

// User Login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        localStorage.setItem("currentUser", username);
        tasks = userData.tasks || [];
        displayTodoList();
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('todo-section').style.display = 'block';
    } else {
        alert("Invalid username or password.");
    }
}

// Save and Exit Function
function saveAndExit() {
    saveTasks();
    localStorage.removeItem("currentUser");
    currentUser = null;
    tasks = [];
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('todo-section').style.display = 'none';
    document.getElementById('todo-list').innerHTML = '';
}

// Add Task
function addTask() {
    const task = document.getElementById('new-task').value;
    if (task.trim() === "") return;
    tasks.push({ text: task, completed: false });
    saveTasks();
    displayTodoList();
    document.getElementById('new-task').value = '';
}

// Display To-Do List
function displayTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');
        li.onclick = () => toggleTask(index);
        todoList.appendChild(li);
    });
}

// Toggle Task Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTodoList();
}

// Save Tasks to Local Storage
function saveTasks() {
    if (currentUser) {
        const userData = JSON.parse(localStorage.getItem(currentUser));
        userData.tasks = tasks;
        localStorage.setItem(currentUser, JSON.stringify(userData));
    }
}
    
