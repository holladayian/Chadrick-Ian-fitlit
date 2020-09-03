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

// const submitDateInput = document.querySelector(".submit-date-button");
const submitDateButton = document.querySelector(".submit-date-button");

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
submitDateButton.addEventListener('click', validateDate);

function loadInfoForDashboard() {
  // the "1" below needs to be dynamic
  user = userRepository.instantiateUser(1);
  userSleep = sleepRepository.instantiateUserSleep(1);
  userHydro = hydrationRepository.instantiateHydroUser(1);
  userActive = activityRepository.instantiateUserActivity(1);
  fillOutWelcome();
  compareSteps();
  displayAllTimeSleepStuff();
  fillOutUserInfoCard();
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
  welcomeParagraph.innerText = `Well hello there ${user.name}!`
}

function compareSteps() {
  compareUserActivityParagraph.innerText = `Your daily step goal is ${user.dailyStepGoal} steps, while the average step goal of everybody else is ${userRepository.findTotalAverageStepGoal()} steps. Your expectations might be too high for your level of physical prowess... LOL`
}

function displayTodaysWaterConsumption(startDate) {
  // the below date will need to be passed in dynamically
  dailyWaterParagraph.innerText = `You gone done drank ${userHydro.findSpecificDayHydration(startDate)} ounces of pond water today! Watch out for them gators! `
}

function displayWeeklyWaterConsumption(startDate, endDate) {
  let waterWeek = userHydro.findHydrationWeek(startDate, endDate);
  let waterDayList = waterWeek.map(day => {
    return `On day ${waterWeek.indexOf(day) + 1} you gone done drank ${day.numOunces} ounces of pond water!`;
  })
  let weeklyWater = waterDayList.join(' ');
  weekWaterParagraph.innerText = `${weeklyWater}`;
}

function displaySleepDay(startDate) {
  lastNightSleepParagraph.innerText = `Last night you done gone slept ${userSleep.findSpecificDaySleepHours(startDate)} hours! Watch out for them bedbugs. They've got their hungry eyes on you!`
}

function displaySleepWeek(startDate, endDate) {
  let sleepHours = userSleep.specificUserWeeklySleepHours(startDate, endDate);
  let sleepDayList = sleepHours.map(day => {
    return `On day ${sleepHours.indexOf(day) + 1} you slept ${day} hours!`;
  })
  let weeklySleep = sleepDayList.join(' ');
  console.log(weeklySleep);
  weekSleepParagraph.innerText = `${weeklySleep}`;
}

function findWhoSleepsMost(startDate) {
  let sleepRager = sleepRepository.whoIsTheSleepOutlier(startDate, "max");
}

function displayAllTimeSleepStuff() {
  allTimeSleepParagraph.innerText = `Your all time sleep quality average is ${userSleep.findAllTimeSleepQualityAverage()} out of 10, and your all time average sleep hours is ${userSleep.findAllTimeHoursSleptAverage()} hours.`
}

function displayLatestDaySteps(startDate) {
  dailyStepsParagraph.innerText = `You done gone walked ${userActive.findSpecificStepsWalked(startDate)} steps today. Well! There's always tomorrow? He he he.`;
}

function displayLatestMinutesActive(startDate) {
  dailyMinutesActiveParagraph.innerText = `You were active for a lousy ${userActive.userMinutesActive(startDate)} minutes today? Way to go? Ha ha ha.`;
}

function displayLatestMilesWalked(startDate) {
  dailyDistanceWalkedParagraph.innerText = `Sheesh! You seriously walked ${userActive.findMilesWalkedSpecificDay(startDate)} miles today? Do you even own a car?`;
}

function compareUserToAverageDayActivity(startDate) {
  stepGoalVsAverageParagraph.innerText = `Wow! You walked ${userActive.findSpecificStepsWalked(startDate)} steps, while everybody else walked an average of ${activityRepository.findAverageNumberOfStepsTakenForADate(startDate)} steps. You were active for ${userActive.userMinutesActive(startDate)} minutes, while everybody else was active an average of ${activityRepository.findAverageMinutesActiveForADate(startDate)} minutes. You climbed ${userActive.findStairsClimbedSpecificDay(startDate)} flights of stairs, while everybody else climbed an average of ${activityRepository.findAverageFlightsOfStairsClimbedForADate(startDate)} flights of stairs. What matters is that your friends are doing better than you. Ha ha ha.`
}

function displayAcitityForWeek(startDate, endDate) {
  let weeklyInfo = userActive.findActivityWeek(startDate, endDate);
  let rundownList = weeklyInfo.map(info => {
    return `On day ${weeklyInfo.indexOf(info) + 1} you walked ${info.numSteps} steps, were active for ${info.minutesActive} minutes, and climbed ${info.flightsOfStairs} flights of stairs!`;
  })
  let weeklyRundown = rundownList.join(' ');
  weekActivityParagraph.innerText = `${weeklyRundown}`;
}

function validateDate(event) {
  const submitDateInput = document.querySelector(".submit-date-input");
  let findDate = userSleep.userSleepInformation.find(day => {
    return day.date === submitDateInput.value
    })
  console.log(findDate);
  console.log(userSleep.userSleepInformation);
  console.log(submitDateInput);
  if (findDate) {
      return findADate(event, submitDateInput)
  }
}

function findADate(event, submitDateInput) {
  if(!event) {
    thisSelectedDate = '2019/06/22'
  } else {
  thisSelectedDate = submitDateInput.value
  }
  console.log(thisSelectedDate);
  // set veriables for findBeginningOfWeek and selectDate.
  displayAcitityForWeek(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  compareUserToAverageDayActivity(selectDate(thisSelectedDate));
  displayLatestMilesWalked(selectDate(thisSelectedDate));
  displayLatestMinutesActive(selectDate(thisSelectedDate));
  displayLatestDaySteps(selectDate(thisSelectedDate));
  displaySleepWeek(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  displaySleepDay(selectDate(thisSelectedDate));
  displayWeeklyWaterConsumption(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  displayTodaysWaterConsumption(selectDate(thisSelectedDate));

}

function selectDate(day) {
  return moment(day, 'YYYY/MM/DD').format('YYYY/MM/DD');
}

function findBeginningOfWeek(day) {
  return moment(day, 'YYYY/MM/DD').subtract(7, 'days').format('YYYY/MM/DD');
}

selectDate("2019/06/15");
findBeginningOfWeek("2019/06/15");
