document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    document.getElementById('addNewListBtn').addEventListener('click', showNewListBox);
    document.getElementById('addNewTaskBtn').addEventListener('click', addNewTask);
  });
  
  function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" id="task-${index}" ${task.done ? 'checked' : ''}>
        <label for="task-${index}">${task.text}</label>
      `;
      taskList.appendChild(li);
    });
  }
  
  function showNewListBox() {
    document.getElementById('newListBox').style.display = 'block';
  }
  
  function addNewTask() {
    const taskInput = document.getElementById('newTaskInput');
    if (!taskInput) return;
    
    const taskText = taskInput.value.trim();
    if (!taskText) return;
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskInput.value = '';
    document.getElementById('newListBox').style.display = 'none';
    loadTasks();
  }
  
  function markTasksAsDone() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    Array.from(taskList.children).forEach((li, index) => {
      tasks[index].done = li.querySelector('input[type="checkbox"]').checked;
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
  