// var moment = require('moment');
let theSelectedDate;


window.addEventListener('click', findBeginningOfWeek);


function selectDate(day) {
  theSelectedDate = moment(day, 'YYYY-MM-DD');
  console.log(theSelectedDate.format('YYYY-MM-DD'));
  return theSelectedDate.format('YYYY-MM-DD');
}
