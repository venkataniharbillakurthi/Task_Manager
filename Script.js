document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(taskItem => taskItem.textContent.replace('Delete', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a task to the DOM
    const addTaskToDOM = (taskText) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '-';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    };

    // Add task event
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        addTaskToDOM(taskText);
        saveTasks();

        taskInput.value = '';
    });

    // Handle Enter key for adding tasks
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});

