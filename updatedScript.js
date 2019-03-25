var DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar(options) {
    this._year = options.year || new Date().getFullYear();
    this._month = options.month - 1 || new Date().getMonth();
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
        var weekDayCell = document.createElement('th');
        weekDayCell.innerHTML = DAYS_OF_WEEK[i];
        tableHeader.appendChild(weekDayCell);
    }

    return tableHeader;
}

Calendar.prototype._getFirstWeekdayOfMonth = function() {
    var weekday = this._enteredDate.getDay();

    // changing sunday from 0 to 6, the other weekdays 
    // become one number lower respectively
    return weekday === 0 ? 6 : weekday - 1;
}
