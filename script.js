const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

class Calendar {
    constructor(options) {
        this._year = options.year;
        this._month = options.month - 1;
        this._container = options.container;
        this._enteredDate = new Date(this._year, this._month);
    }

    render() {
        const calendar = this._createCalendarTemplate();

        this._fillCalendarWithRows(calendar);
        this._fillCalendarWithDays(calendar);

        this._container.appendChild(calendar);
    }

    _createCalendarTemplate() {
        const calendarTable = document.createElement('table');
        const tableBody = document.createElement('tbody');

        tableBody.appendChild(this._createCalendarHeader());
        calendarTable.appendChild(this._createCalendarCaption());
        calendarTable.appendChild(tableBody);
    
        return calendarTable;
    }

    _createCalendarHeader() {
        const tableHeader = document.createElement('tr');

        for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
            const weekdayNameCell = document.createElement('th');
            weekdayNameCell.innerHTML = DAYS_OF_WEEK[i];
            tableHeader.appendChild(weekdayNameCell);
        }

        return tableHeader;
    }

    _createCalendarCaption() {
        const tableCaption = document.createElement('caption');
        const monthLongFormat = this._enteredDate.toLocaleString('en', { month: 'long' });

        tableCaption.textContent = `${monthLongFormat}, ${this._year}`;

        return tableCaption;
    }

    _fillCalendarWithRows(calendarTemplate) {
        const numberOfRows = this._getNumberOfRows();

        for (let i = 0; i < numberOfRows; i++) {
            const calendarRow = document.createElement('tr');

            for (let j = 0; j < DAYS_OF_WEEK.length; j++) {
                const weekdayCell = document.createElement('td');
                calendarRow.appendChild(weekdayCell);
            }

            calendarTemplate.lastChild.appendChild(calendarRow);
        }
    }

    _getNumberOfRows() {
        // The amount of rows needed for the calendar table equals the number of empty cells before
        // the first day of month plus the number of days in this month divided by the number of weekdays
        const numberOfRows = Math.ceil(
            (this._getFirstWeekdayOfMonth() + this._getNumberOfDaysInMonth()) / DAYS_OF_WEEK.length
        );

        return numberOfRows;
    }

    _getFirstWeekdayOfMonth() {
        let weekday = this._enteredDate.getDay();

        // changing sunday from 0 to 6, the other weekdays 
        // become one number lower respectively
        return weekday === 0 ? 6 : weekday - 1;
    }

    _getNumberOfDaysInMonth() {
        // The day with the given value of 0 gives the last day of the previous month.
        return new Date(this._year, this._month + 1, 0).getDate();
    }

    _fillCalendarWithDays(calendarTable) {
        const firstWeekdayOfMonth = this._getFirstWeekdayOfMonth();
        const numberOfDaysInMonth = this._getNumberOfDaysInMonth();
        const weekdayCells = calendarTable.getElementsByTagName('td');
        let currentDayNumber = 1;

        for (let i = firstWeekdayOfMonth; i <= weekdayCells.length; i++) {
            weekdayCells[i].textContent = currentDayNumber;
            currentDayNumber++;
            if (currentDayNumber > numberOfDaysInMonth) break;
        }
    }
}

const deleteButton = document.getElementById('button-delete');
const createButton = document.getElementById('button-create');

createButton.addEventListener('click', function() {
    let enteredYear = document.getElementById('getYear').value;
    let enteredMonth = document.getElementById('getMonth').value;

    if (enteredYear === '') {
        enteredYear = new Date().getFullYear();
    }

    if (enteredMonth === '') {
        enteredMonth = new Date().getMonth() + 1;
    }

    const options = {
            year: enteredYear,
            month: enteredMonth,
            container: document.getElementById('calendars')
        };

    const calendar = new Calendar(options);

    calendar.render();
});

deleteButton.addEventListener('click', function() {
    const container = document.getElementById('calendars');
    const numberOfCalendars = container.children.length;

    for (let i = numberOfCalendars - 1; i >= 0; i--) {
        container.removeChild(container.children[i]);
    }
});



