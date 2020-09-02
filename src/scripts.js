if (typeof(require) !== 'undefined') {
  var moment = require('moment');
  const UserRepository = require('../src/userRepository');
  const HydrationRepository = require('../src/HydrationRepository');
  const SleepRepository = require('../src/SleepRepository');
  const ActivityRepository = require('../src/ActivityRepository');
}

let theSelectedDate;
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
const cardFriends = document.querySelector('.card-friends');
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

const selectableScrollBox = document.querySelector(".selectbox-scrollable");

window.addEventListener('onload', loadInfoForDashboard());
selectableScrollBox.addEventListener('click', findADate);

function loadInfoForDashboard() {
  // the "1" below needs to be dynamic
  user = userRepository.instantiateUser(1);
  userSleep = sleepRepository.instantiateUserSleep(1);
  userHydro = hydrationRepository.instantiateHydroUser(1);
  userActive = activityRepository.instantiateUserActivity(1);
  // displayTodaysWaterConsumption();
  fillOutWelcome();
  compareSteps();
  // displayWeeklyWaterConsumption();
  // displaySleepDay();
  // displaySleepWeek();
  displayAllTimeSleepStuff();
  // displayLatestDaySteps();
  // displayLatestMinutesActive();
  // displayLatestMilesWalked();
  // compareUserToAverageDayActivity();
  // displayAcitityForWeek();
  // intantiateRepositories();
  fillOutUserInfoCard();
  // displayLatestDaySteps();
  findADate();
}

function fillOutUserInfoCard() {
  cardName.innerText =  `${user.name}`;
  cardAddress.innerText = `${user.address}`;
  cardEmail.innerText = `${user.email}`;
  cardStrideLength.innerText = `${user.strideLength}`;
  cardDailyStepGoal.innerText = `${user.dailyStepGoal}`;
  cardFriends.innerText = `${user.friends}`;
  cardFriends.innerText = interpolateFriends(user.id);
}

function getFriends(id) {
console.log(activityRepository.findFriends(id));
  return activityRepository.findFriends(id)
}

function interpolateFriends(id) {
  let friendNames = getFriends(id).map(friend => friend.user.name);
  return friendNames.join(', ');
}

function fillOutWelcome() {
  welcomeParagraph.innerText = `Yooohoo ${user.name}`
}

function compareSteps() {
  compareUserActivityParagraph.innerText = `your shit is ${user.dailyStepGoal}, errbody else has an average of ${userRepository.findTotalAverageStepGoal()}`
}

function displayTodaysWaterConsumption(startDate) {
  // the below date will need to be passed in dynamically
  dailyWaterParagraph.innerText = `Ya don drank ${userHydro.findSpecificDayHydration(startDate)} ounces today`
}

function displayWeeklyWaterConsumption(startDate, endDate) {
  // the below date will need to be passed in dynamically
// We might also consider throuwing in a forEach to display each day
// fix the text based stuff
console.log(userHydro.weeklyHydration(startDate, endDate));
  weekWaterParagraph.innerText = `The whatar consumption for a week has been ${userHydro.weeklyHydration(startDate, endDate)}`
}

function displaySleepDay(startDate) {
  // the below date will need to be passed in dynamically
  lastNightSleepParagraph.innerText = `Last night ya slept ${userSleep.findSpecificDaySleepHours(startDate)} hours!`
}

function displaySleepWeek(startDate, endDate) {
  let sleepHours = userSleep.specificUserWeeklySleepHours(startDate, endDate);
  weekSleepParagraph.innerText = `This week you slept ${sleepHours[0]} hours on day one,  ${sleepHours[1]} hours on day two, ${sleepHours[2]} hours on day three, ${sleepHours[3]} hours on day four, ${sleepHours[4]} hours on day five, ${sleepHours[5]} hours on day six, and ${sleepHours[6]} hours on day seven.`
}


function displayAllTimeSleepStuff() {
  allTimeSleepParagraph.innerText = `Your all time sleep quality average is ${userSleep.findAllTimeSleepQualityAverage()} out of 10, and your all time average sleep hours is ${userSleep.findAllTimeHoursSleptAverage()} hours`
}

function displayLatestDaySteps(startDate) {
  // the below date will need to be passed in dynamically
  dailyStepsParagraph.innerText = `You walked ${userActive.findSpecificStepsWalked(startDate)} steps today. Well... There's always tomorrow!`;
}

function displayLatestMinutesActive(startDate) {
  dailyMinutesActiveParagraph.innerText = `You were active for ${userActive.userMinutesActive(startDate)} minutes. Way to go?`;
}

function displayLatestMilesWalked(startDate) {
  dailyDistanceWalkedParagraph.innerText = `Sheesh... You seriously walked ${userActive.findMilesWalkedSpecificDay(startDate)} miles today... Do you even own a car?`;
}

function compareUserToAverageDayActivity(startDate) {
  stepGoalVsAverageParagraph.innerText = `Woah... You walked ${userActive.findSpecificStepsWalked(startDate)} steps, while errbody else walked an average of ${activityRepository.findAverageNumberOfStepsTakenForADate(startDate)} steps. You were active for ${userActive.userMinutesActive(startDate)} minutes, while errbody else was active an average of ${activityRepository.findAverageMinutesActiveForADate(startDate)} minutes. You climbed ${userActive.findStairsClimbedSpecificDay(startDate)} flights of stairs, while errbody else climbed an average of ${activityRepository.findAverageFlightsOfStairsClimbedForADate(startDate)} flights of stairs. What matters is that you're trying your best, right??`
}

function displayAcitityForWeek(startDate, endDate) {
  let weeklyInfo = userActive.findActivityWeek(startDate, endDate);
  let rundownList = weeklyInfo.map(info => {
    return `On day ${weeklyInfo.indexOf(info) + 1} you walked ${info.numSteps} steps, were active for ${info.minutesActive} minutes, and climbed ${info.flightsOfStairs} flights of stairs!`;
  })
  let weeklyRundown = rundownList.join(' ');
  weekActivityParagraph.innerText = `${weeklyRundown}`;
}

function findADate(event) {
  // let thisSelectedDate = event.target.value || '2019/06/22'
  if(!event) {
    thisSelectedDate = '2019/06/22'
  } else {
  thisSelectedDate = event.target.value
  }
  console.log(thisSelectedDate);
  displayAcitityForWeek(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  compareUserToAverageDayActivity(findBeginningOfWeek(thisSelectedDate));
  displayLatestMilesWalked(findBeginningOfWeek(thisSelectedDate));
  displayLatestMinutesActive(findBeginningOfWeek(thisSelectedDate));
  displayLatestDaySteps(findBeginningOfWeek(thisSelectedDate));
  displaySleepWeek(findBeginningOfWeek(thisSelectedDate));
  displaySleepDay(findBeginningOfWeek(thisSelectedDate));
  displayWeeklyWaterConsumption(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  displayTodaysWaterConsumption(findBeginningOfWeek(thisSelectedDate));



  // selectDate(theSelectedDate);
  // findBeginningOfWeek(theSelectedDate);
}

function selectDate(day) {
  return moment(day, 'YYYY/MM/DD').format('YYYY/MM/DD');
  // console.log(theSelectedDate.format('YYYY/MM/DD'));
  // console.log(theSelectedDate.format('YYYY/MM/DD'));
  // return theSelectedDate.format('YYYY/MM/DD');
}

function findBeginningOfWeek(day) {
  // const selectedDay = moment(selectDate(day));
  // console.log(theSelectedDate.subtract(7, 'days').format('YYYY/MM/DD'));
  return moment(day, 'YYYY/MM/DD').subtract(7, 'days').format('YYYY/MM/DD');
  // const weekStartDate = selectedDay.subtract(7, 'days');
  // return theSelectedDate.format('YYYY/MM/DD');
}

selectDate("2019/06/15");
findBeginningOfWeek("2019/06/15");
