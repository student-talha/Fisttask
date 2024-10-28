let todoList = [];
let editIndex = -1; // To keep track of the task being edited

document.getElementById("addButton").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("todo_input").value;
  const dueDateInput = document.getElementById("todo_date").value;
  const priorityInput = document.getElementById("priority").value;

  // Validate task input
  if (taskInput) {
    // Add the new task to the todoList
    todoList.push({
      task: taskInput,
      dueDate: dueDateInput,
      priority: priorityInput,
      completed: false,
    });

    saveTasks(); // Save the updated task list
    displayTasks(); // Display the updated task list

    // Clear input fields after adding the task
    clearInputFields();
  } else {
    alert("Please enter a task."); // Alert if task input is empty
  }
}

// Function to clear input fields
function clearInputFields() {
  document.getElementById("todo_input").value = ""; // Clear task input
  document.getElementById("todo_date").value = ""; // Clear due date input
  document.getElementById("priority").value = "Low"; // Reset priority to default value
}

function displayTasks() {
  const todoListElement = document.getElementById("todoList");
  todoListElement.innerHTML = "";

  // Loop through each task and create HTML elements
  todoList.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = `todo-item priority-${todo.priority.toLowerCase()} ${
      todo.completed ? "completed" : ""
    }`;

    todoItem.innerHTML = `
            <div class="details">
                <span><strong>${
                  todo.completed ? '<i class="fas fa-check-circle"></i>' : ""
                } Task:</strong> ${todo.task}</span><br>
                <span><strong>Due:</strong> ${todo.dueDate}</span><br>
                <span><strong>Priority:</strong> ${todo.priority}</span>
            </div>
            <button onclick="toggleComplete(${index})" class="complete-button">${
      todo.completed ? "Undo" : "Complete"
    }</button>
            <button onclick="openEditModal(${index})" class="edit-button">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

    todoListElement.appendChild(todoItem);
  });
}

// Function to open the edit modal
function openEditModal(index) {
  editIndex = index; // Set the index of the task to edit
  const taskToEdit = todoList[index];

  // Set input values in the modal
  document.getElementById("editTaskInput").value = taskToEdit.task;
  document.getElementById("editDueDateInput").value = taskToEdit.dueDate;
  document.getElementById("editPriorityInput").value = taskToEdit.priority;

  // Display the modal
  document.getElementById("editModal").style.display = "block";
}

// Function to close the edit modal
function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// Function to save the edited task
function saveEdit() {
  const newTask = document.getElementById("editTaskInput").value;
  const newDueDate = document.getElementById("editDueDateInput").value;
  const newPriority = document.getElementById("editPriorityInput").value;

  if (newTask) {
    todoList[editIndex].task = newTask; // Update the task
  }
  if (newDueDate) {
    todoList[editIndex].dueDate = newDueDate; // Update the due date
  }
  if (newPriority && ["Low", "Medium", "High"].includes(newPriority)) {
    todoList[editIndex].priority = newPriority; // Update the priority
  }

  saveTasks(); // Save the updated task list
  displayTasks(); // Display the updated task list
  closeEditModal(); // Close the modal after saving
}

function toggleComplete(index) {
  todoList[index].completed = !todoList[index].completed; // Toggle completion status
  saveTasks(); // Save the updated task list
  displayTasks(); // Display the updated task list
}

function deleteTask(index) {
  todoList.splice(index, 1); // Remove the task
  saveTasks(); // Save the updated task list
  displayTasks(); // Display the updated task list
}

function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(todoList)); // Save tasks to local storage
}

// Load tasks from local storage on page load
window.onload = function () {
  const savedTasks = localStorage.getItem("todoList");
  if (savedTasks) {
    todoList = JSON.parse(savedTasks); // Parse saved tasks
    displayTasks(); // Display tasks
  }
};
