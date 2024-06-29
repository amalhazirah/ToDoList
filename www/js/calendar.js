document.addEventListener('DOMContentLoaded', function () {
    renderCalendar();
  });
  
  function renderCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    if (!calendarBody) return;
  
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let date = 1;
    calendarBody.innerHTML = '';
  
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');
      
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        if (i === 0 && j < firstDay) {
          cell.innerHTML = '';
        } else if (date > daysInMonth) {
          break;
        } else {
          cell.innerHTML = date;
          if (date === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
            cell.classList.add('today');
          }
          date++;
        }
        row.appendChild(cell);
      }
      calendarBody.appendChild(row);
    }
  }
  