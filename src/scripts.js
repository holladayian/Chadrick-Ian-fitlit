if (typeof(require) !== 'undefined') {
  var moment = require('moment');
  const UserRepository = require('../src/userRepository');
  const HydrationRepository = require('../src/HydrationRepository');
  const SleepRepository = require('../src/SleepRepository');
  const ActivityRepository = require('../src/ActivityRepository');
}

// let theSelectedDate;
const userRepository = new UserRepository(userData);
let user;
const hydrationRepository = new HydrationRepository(hydrationData);
const sleepRepository = new SleepRepository(sleepData);
const activityRepository = new ActivityRepository(activityData);
const welcomeParagraph = document.querySelector(".welcome-paragraph");
const cardName = document.querySelector(".card-name");
const cardAddress = document.querySelector(".card-address");
const cardEmail = document.querySelector(".card-email");
const cardStrideLength = document.querySelector(".card-stride-length");
const cardDailyStepGoal = document.querySelector(".card-daily-step-goal");
const dailyWaterParagraph = document.querySelector(".daily-water-paragraph");
const weekWaterParagraph = document.querySelector(".week-water-paragraph");
const lastNightSleepParagraph = document.querySelector(".last-night-sleep-paragraph");

// const cardFriends = document.querySelector(".card-friends");

const compareUserActivityParagraph = document.querySelector(".compare-user-activity-paragraph");
const weekActivityParagraph = document.querySelector(".week-activity-paragraph");
const weekSleepParagraph = document.querySelector(".week-sleep-paragraph");
const allTimeSleepParagraph = document.querySelector(".all-time-sleep-paragraph");
const stepGoalVsAverageParagraph = document.querySelector(".step-goal-vs-average-paragraph");
const dailyStepsParagraph = document.querySelector(".daily-steps-paragraph");
const dailyMinutesActiveParagraph = document.querySelector(".daily-minutes-active-paragraph");
const dailyDistanceWalkedParagraph = document.querySelector(".daily-distance-walked-paragraph");


// window.onload(loadInfoForDashboard());
window.addEventListener('onload', loadInfoForDashboard());
// window.addEventListener('click', findBeginningOfWeek);

// -This JS file should call methods from your classes to retrieve information.
//-There should not be any DOM manipulation within the User or UserRepository class files.
// -To develop this dashboard, first choose a user at random - someone with a randomly generated name that speaks to you. On the dashboard for a user:
function loadInfoForDashboard() {
  // the "1" below needs to be dynamic
  user = userRepository.instantiateUser(1);
  userSleep = sleepRepository.instantiateUserSleep(1);
  userHydro = hydrationRepository.instantiateHydroUser(1);
  userActivity = activityRepository.instantiateUserActivity(1);
  displayTodaysWaterConsumption();
  fillOutWelcome();
  compareSteps();
  displayWeeklyWaterConsumption();
  displaySleepDay();
  displaySleepWeek();
  displayAllTimeSleepStuff();
  // intantiateRepositories();
  fillOutUserInfoCard();
  displayLatestDaySteps();
}
// function intantiateRepositories() {
//   userRepository = new UserRepository();
//   hydrationRepository = new HydrationRepository();
//   sleepRepository = new SleepRepository();
//   activityRepository = new ActivityRepository();
//   user = userRepository.instantiateUser(1);
//   console.log(user);
// }
// -Create an info card on the dashboard with all of user’s info on the page
//We need to create a variable to hold the data from the individual user data. perhaps creating an empty variable of userData and creating a function that applies the user data to the the variable after an event which would require an event listener and relevant function.
//id: userData.id,
function fillOutUserInfoCard() {
  cardName.innerText =  `${user.userData.name}`;
  cardAddress.innerText = `${user.userData.address}`;
  cardEmail.innerText = `${user.userData.email}`;
  cardStrideLength.innerText = `${user.userData.strideLength}`;
  cardDailyStepGoal.innerText = `${user.userData.dailyStepGoal}`;
  // cardFriends.innerText = `${user.userData.friends}`;
}

function fillOutWelcome() {
  welcomeParagraph.innerText = `Yooohoo ${user.userData.name}`
}
function compareSteps() {
  compareUserActivityParagraph.innerText = `your shit is ${user.userData.dailyStepGoal}, errbody else has an average of ${userRepository.findTotalAverageStepGoal()}`
}

function displayTodaysWaterConsumption() {
  // the below date will need to be passed in dynamically
  dailyWaterParagraph.innerText = `Ya don drank ${userHydro.findSpecificDayHydration("2019/06/15")} ounces today`
}

function displayWeeklyWaterConsumption() {
  // the below date will need to be passed in dynamically
// We might also consider throuwing in a forEach to display each day
  weekWaterParagraph.innerText = `The whatar consumption for a week has been ${userHydro.weeklyHydration("2019/06/15", "2019/06/22")}`
}

function displaySleepDay() {
  // the below date will need to be passed in dynamically
  lastNightSleepParagraph.innerText = `Last night ya slept ${userSleep.findSpecificDaySleepHours("2019/06/15")} hours!`
}

function displaySleepWeek() {
  // the below date will need to be passed in dynamically
  // We might also consider throuwing in a forEach to display each day
  weekSleepParagraph.innerText = `This week you slept ${userSleep.specificUserWeeklySleepHours("2019/06/15", "2019/06/22")}`
}

function displayAllTimeSleepStuff() {
  allTimeSleepParagraph.innerText = `Your all time sleep quality average is ${userSleep.findAllTimeSleepQualityAverage()} out of 10, and your all time average sleep hours is ${userSleep.findAllTimeHoursSleptAverage()} hours`
}

function displayLatestDaySteps() {
    // the below date will need to be passed in dynamically
      dailyStepsParagraph.innerText = `You walked ${userActivity.findStartDateInfo("2019/06/15").numSteps} steps today. Well... There's always tomorrow!`;
}
// Activity: it4


//   -For a user, the number of steps for the latest day
//Create placeholder tag and style in html and css. create querry selectors to steps for day value to placeholder. Create necessary event listener and function to apply to dom.

//   -For a user, the number minutes active for the latest day
// Create placeholder tag and style in html and css. create querry selectors to minutesactive for day value to placeholder. Create necessary event listener and function to apply to dom.

//   -For a user, the distance they have walked (in miles) for the latest day based on their step count
//Create placeholder tag and style in html and css. create querry selectors to connnect miles walked for day value to placeholder. Create necessary event listener and function to apply to dom.

//   -How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day
// create placeholder tags and style in html and css. create query selector for user day values and average values perhaps side by side or over eachother, apply each value of the weekly from activities day and averaged day averaged acitivites of all users day to particular spots in the placeholder, I would consider an iterator method to create html for the widget.

//   -For a user, a weekly view of their step count, flights of stairs climbed, and minutes active
//create placeholder tags and style in html and css. create query selector for days of weeks, apply each value of the weekly from activities to particular spots in the placeholder, I would consider an iterator method to create html for the widget.


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
