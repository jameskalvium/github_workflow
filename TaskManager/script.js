// Adds a new task to the task list
function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDateInput");

  const taskText = input.value.trim(); // Get and trim task text
  const dueDate = dateInput.value;     // Get selected due date

  // Prevent adding if either field is empty
  if (taskText === "" || dueDate === "") return;

  // Create task object with text and due date
  const task = { text: taskText, due: dueDate };

  // Render the new task in the UI
  renderTask(task);

  // Save all tasks including the new one to localStorage
  saveTasksToStorage();

  // Clear input fields after task is added
  input.value = "";
  dateInput.value = "";
}

// Renders a task in the DOM with styling based on urgency
function renderTask(task) {
  const li = document.createElement("li"); // Create task list item

  // Create span for task text
  const span = document.createElement("span");
  span.textContent = task.text;

  // Create element to display formatted due date with urgency color
  const due = document.createElement("small");
  due.textContent = formatDate(task.due); // Convert date to readable format
  due.className = getUrgencyClass(task.due); // Assign class based on urgency

  // Create delete button and set its behavior
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => {
    li.remove();           // Remove task from UI
    saveTasksToStorage();  // Update saved tasks in localStorage
  };

  // Add text, date, and delete button to the task list item
  li.appendChild(span);
  li.appendChild(due);
  li.appendChild(delBtn);

  // Add the task to the task list in the DOM
  document.getElementById("taskList").appendChild(li);
}

// Converts date string (YYYY-MM-DD) into human-readable format
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

// Determines the urgency class (used for styling color)
function getUrgencyClass(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);

  // Remove time portion to compare only dates
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  if (due < today) return "overdue";         // Past date = red
  if (due.getTime() === today.getTime()) return "due-today"; // Today = orange
  return "upcoming";                         // Future date = green
}

// Saves all current tasks in the UI into localStorage
function saveTasksToStorage() {
  const tasks = [];

  // Loop through all <li> items and extract text and due date
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const due = li.querySelector("small").getAttribute("data-date") || li.querySelector("small").textContent;
    tasks.push({ text, due }); // Push each task object to array
  });

  // Save serialized array to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Runs when page loads: fetches saved tasks from localStorage and displays them
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(renderTask); // Display each saved task
};
