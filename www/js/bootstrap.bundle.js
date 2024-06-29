document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mainPage = document.getElementById('main');
    const calendarPage = document.getElementById('calendar');
    const summaryPage = document.getElementById('summary');
    const mainLink = document.getElementById('main-link');
    const calendarLink = document.getElementById('calendar-link');
    const summaryLink = document.getElementById('summary-link');
    const todoList = document.getElementById('todo-list');
    const addBtn = document.getElementById('add-btn');
    const newTodoContainer = document.getElementById('new-todo-container');
    const newTodoInput = document.getElementById('new-todo-input');
    const newTodoAddBtn = document.getElementById('new-todo-add-btn');
    const completedList = document.getElementById('completed-list');
    const pendingList = document.getElementById('pending-list');
    const tasksLeftCount = document.getElementById('tasks-left-count');
    const progressText = document.getElementById('progress-text');
    const progressCircle = document.getElementById('progress-circle');

    let todos = [];

    // Navigation
    function navigate(page) {
        mainPage.classList.add('hidden');
        calendarPage.classList.add('hidden');
        summaryPage.classList.add('hidden');

        if (page === 'main') mainPage.classList.remove('hidden');
        if (page === 'calendar') calendarPage.classList.remove('hidden');
        if (page === 'summary') summaryPage.classList.remove('hidden');
    }

    mainLink.addEventListener('click', () => navigate('main'));
    calendarLink.addEventListener('click', () => navigate('calendar'));
    summaryLink.addEventListener('click', () => navigate('summary'));

    // Add New To-Do
    addBtn.addEventListener('click', () => {
        newTodoContainer.classList.toggle('hidden');
    });

    newTodoAddBtn.addEventListener('click', () => {
        const newTodoText = newTodoInput.value;
        if (newTodoText.trim()) {
            todos.push({ text: newTodoText, done: false });
            newTodoInput.value = '';
            renderTodos();
        }
    });

    // Render To-Do List
    function renderTodos() {
        todoList.innerHTML = '';
        completedList.innerHTML = '';
        pendingList.innerHTML = '';
        let completedCount = 0;

        todos.forEach((todo, index) => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo-item');
            todoDiv.innerHTML = `
                <input type="checkbox" ${todo.done ? 'checked' : ''} data-index="${index}">
                <span>${todo.text}</span>
            `;
            todoList.appendChild(todoDiv);

            if (todo.done) {
                const completedItem = document.createElement('li');
                completedItem.textContent = todo.text;
                completedList.appendChild(completedItem);
                completedCount++;
            } else {
                const pendingItem = document.createElement('li');
                pendingItem.textContent = todo.text;
                pendingList.appendChild(pendingItem);
            }
        });

        // Tasks Left Count
        tasksLeftCount.textContent = todos.length - completedCount;

        // Progress Circle
        const progress = Math.round((completedCount / todos.length) * 100) || 0;
        progressText.textContent = `${progress}%`;
        progressCircle.style.background = `conic-gradient(#4CAF50 ${progress}%, #ddd 0)`;

        // Weekly Summary Chart
        updateChart(completedCount);
    }

    // Toggle To-Do Done State
    todoList.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        todos[index].done = !todos[index].done;
        renderTodos();
    });

    // Calendar
    const calendarContainer = document.getElementById('calendar-container');
    const today = new Date().toDateString();
    calendarContainer.innerHTML = `<h3>${today}</h3>`;

    // Weekly Summary Chart
    const ctx = document.getElementById('weekly-chart').getContext('2d');
    let weeklyChart = new Chart(ctx, {
        type: 'bar',
        data:
