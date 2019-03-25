var DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar(options) {
    this.year = options.year || new Date().getFullYear();
    this.month = options.month - 1 || new Date().getMonth();
}

Calendar.prototype._createCalendarTemplate = function() {

}

Calendar.prototype._createCalendarCaption = function() {

}
