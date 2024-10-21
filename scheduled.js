// DOM Elements
const taskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Event Listener for Add Task Button
addTaskButton.addEventListener('click', addTask);

// Function to Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        
        // Create task text
        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;
        taskItem.appendChild(taskTextElement);
        
        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => taskItem.remove());
        taskItem.appendChild(deleteButton);
        
        // Add task item to list
        taskList.appendChild(taskItem);
        
        // Clear input field
        taskInput.value = '';

        // Toggle task completion on click
        taskTextElement.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });
    }
}

// Optional: Add task by pressing Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
