// var moment = require('moment');
let theSelectedDate;


window.addEventListener('click', findBeginningOfWeek);


function selectDate(day) {
  theSelectedDate = moment(day, 'YYYY/MM/DD');
  console.log(theSelectedDate.format('YYYY/MM/DD'));
  return theSelectedDate.format('YYYY/MM/DD');
}

function findBeginningOfWeek(day) {
  // const selectedDay = moment(selectDate(day));
  console.log(theSelectedDate.subtract(7, 'days').format('YYYY/MM/DD'));
  return theSelectedDate.subtract(7, 'days').format('YYYY/MM/DD');
  // const weekStartDate = selectedDay.subtract(7, 'days');
  // return theSelectedDate.format('YYYY/MM/DD');
}

selectDate("2019/06/15");
findBeginningOfWeek("2019/06/15");
