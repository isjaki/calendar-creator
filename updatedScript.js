var DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar(options) {
    this._year = options.year || new Date().getFullYear();
    this._month = options.month - 1 || new Date().getMonth();
    this._calendarContainer = options.container;
    this._enteredDate = new Date(this._year, this._month);
}

Calendar.prototype._createCalendarTemplate = function() {
    var calendarTable = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableBody.appendChild(this._createCalendarHeader);
    calendarTable.appendChild(this._createCalendarCaption);
    calendarTable.appendChild(tableBody);

    return calendarTable;
}

Calendar.prototype._createCalendarCaption = function() {
    var tableCaption = document.createElement('caption');
    var monthLongFormat = this._enteredDate.toLocaleString('en', { month: 'long' });

    tableCaption.innerHTML = monthLongFormat + ', ' + this._year;

    return tableCaption;
}

Calendar.prototype._createCalendarHeader = function() {
    var tableHeader = document.createElement('tr');

    for (var i = 0; i < DAYS_OF_WEEK.length; i++) {
        var weekdayNameCell = document.createElement('th');
        weekdayNameCell.innerHTML = DAYS_OF_WEEK[i];
        tableHeader.appendChild(weekdayNameCell);
    }

    return tableHeader;
}

Calendar.prototype._getFirstWeekdayOfMonth = function() {
    var weekday = this._enteredDate.getDay();

    // changing sunday from 0 to 6, the other weekdays 
    // become one number lower respectively
    return weekday === 0 ? 6 : weekday - 1;
}

Calendar.prototype._getNumberOfDaysInMonth = function() {
    // The day with the given value of 0 gives the last day of the previous month.
    return new Date(this._year, this._month + 1, 0).getDate();
}

Calendar.prototype._getNumberOfRows = function() {
    // The amount of rows needed for the calendar table equals the number of empty cells before
    // the first day of month plus the number of days in this month divided by the number of weekdays
    var numberOfRows = Math.ceil(
        this._getFirstWeekdayOfMonth() + this._getNumberOfDaysInMonth() / DAYS_OF_WEEK.length
    );

    return numberOfRows;
}

Calendar.prototype._fillCalendarWithRows = function(calendarTemplate) {
    var numberOfRows = this._getNumberOfRows();

    for (var i = 0; i < numberOfRows; i++) {
        var calendarRow = document.createElement('tr');

        for (var j = 0; i < DAYS_OF_WEEK.length; j++) {
            var weekdayCell = document.createElement('td');
            calendarRow.appendChild(weekdayCell);
        }

        calendarTemplate.lastChild.appendChild(calendarRow);
    }
}

Calendar.prototype._fillCalendarWithDays = function(calendarTable) {
    var firstWeekdayOfMonth = this._getFirstWeekdayOfMonth();
    var weekdayCells = calendarTable.getElementsByTagName('td');
    var currentDayNumber = 1;

    for (var i = firstWeekdayOfMonth; i <= weekdayCells.length; i++) {
        weekdayCells[i].innerHTML = currentDayNumber;
        currentDayNumber++;
        if (currentDayNumber > this._getNumberOfDaysInMonth()) break;
    }
}

Calendar.prototype.render = function() {
    var calendar = this._createCalendarTemplate();

    this._fillCalendarWithRows(calendar);
    this._fillCalendarWithDays(calendar);

    this._calendarContainer.appendChild(calendar);
}

// document.getElementById('button-create')

// Calendar.prototype.deleteCalendars = function() {
//     for (var i = 0; i < this._calendarContainer.children.length; i++) {
//         this._calendarContainer.removeChild(this._calendarContainer.children[i]);
//     }
// }




