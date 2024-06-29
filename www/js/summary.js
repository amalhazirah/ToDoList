document.addEventListener('DOMContentLoaded', function () {
    loadSummary();
  });
  
  function loadSummary() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedTasksList = document.getElementById('completedTasksList');
    const pendingTasksList = document.getElementById('pendingTasksList');
    const tasksLeftNextWeek = document.getElementById('tasksLeftNextWeek');
    const progressPercentage = document.getElementById('progressPercentage');
    
    completedTasksList.innerHTML = '';
    pendingTasksList.innerHTML = '';
    
    const completedTasks = tasks.filter(task => task.done);
    const pendingTasks = tasks.filter(task => !task.done);
    
    completedTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      completedTasksList.appendChild(li);
    });
  
    pendingTasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      pendingTasksList.appendChild(li);
    });
  
    const today = new Date();
    const tasksDueNextWeek = tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate > today && taskDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    }).length;
  
    tasksLeftNextWeek.textContent = `${tasksDueNextWeek} tasks left for the next 7 days.`;
  
    const totalTasks = tasks.length;
    const completedTasksCount = completedTasks.length;
    const progress = totalTasks ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
  
    progressPercentage.textContent = `${progress}%`;
    document.querySelector('.progress-circle').style.setProperty('--progress', progress);
  }
  