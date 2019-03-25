let buttonCreate = document.getElementById('button-create');
let buttonDelete = document.getElementById('button-delete');

buttonCreate.addEventListener('click', createCalendar);
buttonDelete.addEventListener('click', deleteCalendar);

function createCalendar() {

    let year = document.getElementById('getYear').value;
    let month = document.getElementById('getMonth').value;
   
    // create elements for a table
    let element = document.getElementById('calendar');
    let table = document.createElement('table');
    let tBody = document.createElement('tbody');
    let tHead = document.createElement('tr');
    let tr;

    let caption = document.createElement('caption');

    let date = new Date(year, month - 1);

    let captionMonth = date.toLocaleString('en', {month: 'long'});
    caption.innerHTML = `${captionMonth}, ${year}`;
    
    table.appendChild(caption);
    table.appendChild(tBody);
  
    // Create a table head. First, create an array with weekday names and then 
    // insert them into 'th' elements using the for loop.
    let week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
    for (let i = 0; i < week.length; i++) {
      let th = document.createElement('th');
      th.innerHTML = week[i];
      tHead.appendChild(th); // insert every th element into a table head
    }
  
    table.lastChild.appendChild(tHead);
  
    // The day with the given value of 0 gives the last day of the previous month.
    let numberOfDaysInMonth = new Date(year, month, 0).getDate();
              
    // Let sunday be the last day of week with the given index of 6. 
    let firstDay = (date.getDay() == 0) ? 6 : date.getDay() - 1;
    
    // The amount of rows needed for the table equals the number of empty cells before the first day of month 
    // plus the number of days in this month divided by the number of weekdays
    let numberOfRows = Math.ceil((firstDay + numberOfDaysInMonth) / week.length);
              
    for (let i = 0; i < numberOfRows; i++) {
  
      tr = document.createElement('tr');
  
      for (let j = 0; j < week.length; j++) {
         let td = document.createElement('td');
         tr.appendChild(td);
      }
  
      table.lastChild.appendChild(tr);
    };
  
    let calendarCells = table.getElementsByTagName('td');
  
    let dayNumber = 1;
  
    for (let i = firstDay; i <= calendarCells.length; i++) {
      calendarCells[i].innerHTML = dayNumber;
      dayNumber++;
      if (dayNumber > numberOfDaysInMonth) break;
    }
  
    element.appendChild(table);
}
  
function deleteCalendar() {
    let element = document.getElementById('calendar');

    for (let i = element.children.length - 1; i >= 0; i--) {
      element.removeChild(element.children[i]);
    }
}

  