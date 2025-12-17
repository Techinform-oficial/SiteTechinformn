const calendarGrid = document.getElementById("calendarGrid");
const currentMonthEl = document.getElementById("currentMonth");
const currentYearEl = document.getElementById("currentYear");
const monthsBar = document.getElementById("monthsBar");

let currentDate = new Date();

const months = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
];

function renderCalendar() {
    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentMonthEl.textContent = months[month];
    currentYearEl.textContent = year;

    // Cabeçalho dias
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    days.forEach(d => {
        const el = document.createElement("div");
        el.className = "calendar-header";
        el.textContent = d;
        calendarGrid.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    let dayCounter = 1;
    let nextMonthDay = 1;

    for (let i = 0; i < 42; i++) {
        const cell = document.createElement("div");
        cell.className = "calendar-cell";

        let dayNumber;

        if (i < firstDay) {
            dayNumber = prevMonthDays - firstDay + i + 1;
            cell.classList.add("muted");
        } else if (dayCounter > totalDays) {
            dayNumber = nextMonthDay++;
            cell.classList.add("muted");
        } else {
            dayNumber = dayCounter++;
            cell.onclick = () => selectDay(dayNumber, month, year);
        }

        cell.innerHTML = `<div class="day-number">${dayNumber}</div>`;
        calendarGrid.appendChild(cell);
    }

    renderMonthsBar();
}

function renderMonthsBar() {
    monthsBar.innerHTML = "";

    months.forEach((m, index) => {
        const btn = document.createElement("button");
        btn.className = "month-btn";
        if (index === currentDate.getMonth()) btn.classList.add("active");

        btn.textContent = m.substring(0, 3);
        btn.onclick = () => {
            currentDate.setMonth(index);
            renderCalendar();
        };

        monthsBar.appendChild(btn);
    });
}

function selectDay(day, month, year) {
    document.getElementById("dayDetails").innerHTML = `
        <p><strong>${day}/${month + 1}/${year}</strong></p>
        <p>Nenhum evento</p>
    `;
}

/* Navegação */
document.getElementById("prevMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

document.getElementById("prevYear").onclick = () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderCalendar();
};

document.getElementById("nextYear").onclick = () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderCalendar();
};

renderCalendar();
