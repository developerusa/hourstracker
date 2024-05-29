let hourlyPay = 0;
let totalPay = 0;
let dailyEntries = {};

function startTracking() {
    hourlyPay = parseFloat(document.getElementById('hourlyPay').value) || 9; // Default to 9 if no input
    if (isNaN(hourlyPay) || hourlyPay <= 0) {
        alert("Please enter a valid hourly pay.");
        return;
    }
    document.getElementById('hourlyPaySection').style.display = 'none';
    document.getElementById('calendarSection').style.display = 'block';
    generateCalendar();
}

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Clear previous calendar
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    document.getElementById('monthYear').innerText = `${monthNames[month]} ${year}`;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayName = dayNames[date.getDay()];
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `<span>${dayName}</span>${day}`;
        dayDiv.onclick = () => showInput(dayDiv, day);
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Hours';
        input.onblur = () => enterHours(day, input.value, dayDiv);
        dayDiv.appendChild(input);
        calendar.appendChild(dayDiv);
    }
}

function showInput(dayDiv, day) {
    const input = dayDiv.querySelector('input');
    input.style.display = 'block';
    input.focus();
}

function enterHours(day, hours, dayDiv) {
    const hoursWorked = parseFloat(hours);
    if (isNaN(hoursWorked) || hoursWorked < 0) {
        alert("Please enter valid hours.");
        return;
    }

    dailyEntries[day] = hoursWorked;
    calculateTotalPay();

    const input = dayDiv.querySelector('input');
    if (input) {
        input.style.display = 'none';
    }

    // Display entered hours in the box and add mixed background color class
    dayDiv.innerHTML = `<span>${dayDiv.querySelector('span').textContent}</span>${day}<br>${hoursWorked} hrs`;
    dayDiv.classList.add('mixed-background');
}

function calculateTotalPay() {
    totalPay = 0;
    for (const day in dailyEntries) {
        totalPay += dailyEntries[day] * hourlyPay;
    }
    document.getElementById('totalPay').innerText = `$${totalPay.toFixed(2)}`;
}
