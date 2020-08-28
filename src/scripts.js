// var moment = require('moment');
let theSelectedDate;


window.addEventListener('click', findBeginningOfWeek);


function selectDate(day) {
  theSelectedDate = moment(day, 'YYYY-MM-DD');
  console.log(theSelectedDate.format('YYYY-MM-DD'));
  return theSelectedDate.format('YYYY-MM-DD');
}

function findBeginningOfWeek(day) {
  const selectedDay = moment(selectDate(day));
  const weekStartDate = selectedDay.subtract(7, 'days');
  console.log(weekStartDate.format('YYYY-MM-DD'));
  return theSelectedDate.format('YYYY-MM-DD');
}

selectDate("2019/06/15");
findBeginningOfWeek("2019/06/15");
