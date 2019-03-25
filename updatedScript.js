var DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar(options) {
    this._year = options.year || new Date().getFullYear();
    this._month = options.month - 1 || new Date().getMonth();
    this._enteredDate = new Date(this._year, this._month);
}

Calendar.prototype._createCalendarTemplate = function() {
    const calendarTable = document.createElement('table');
    const tableBody = document.createElement('tbody');


}

Calendar.prototype._createCalendarCaption = function() {
    const tableCaption = document.createElement('caption');


}

Calendar.prototype._createCalendarHeader = function() {
    const tableHeader = document.createElement('tr');
}
