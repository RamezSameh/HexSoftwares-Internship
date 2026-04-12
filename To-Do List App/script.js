const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const STORAGE_KEY = 'todoApp.tasks';

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No tasks yet. Add your first task above.';
    todoList.appendChild(emptyItem);
    return;
  }

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const label = document.createElement('label');
    label.className = 'todo-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const text = document.createElement('p');
    text.className = `todo-text${task.completed ? ' completed' : ''}`;
    text.textContent = task.text;

    label.appendChild(checkbox);
    label.appendChild(text);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => removeTask(task.id));

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

function addTask(text) {
  const trimmedText = text.trim();
  if (!trimmedText) return;

  tasks.push({
    id: Date.now().toString(),
    text: trimmedText,
    completed: false,
  });
  saveTasks();
  renderTasks();
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTask(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
});

renderTasks();
