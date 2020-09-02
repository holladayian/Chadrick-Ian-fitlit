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

window.addEventListener('onload', loadInfoForDashboard());
// window.addEventListener('click', findBeginningOfWeek);

function loadInfoForDashboard() {
  // the "1" below needs to be dynamic
  user = userRepository.instantiateUser(1);
  userSleep = sleepRepository.instantiateUserSleep(1);
  userHydro = hydrationRepository.instantiateHydroUser(1);
  userActive = activityRepository.instantiateUserActivity(1);
  displayTodaysWaterConsumption();
  fillOutWelcome();
  compareSteps();
  displayWeeklyWaterConsumption();
  displaySleepDay();
  displaySleepWeek();
  displayAllTimeSleepStuff();
  displayLatestDaySteps();
  displayLatestMinutesActive();
  displayLatestMilesWalked();
  compareUserToAverageDayActivity();
  displayAcitityForWeek();
  // intantiateRepositories();
  fillOutUserInfoCard();
  displayLatestDaySteps();
}

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
  let sleepHours = userSleep.specificUserWeeklySleepHours("2019/06/15", "2019/06/22");
  weekSleepParagraph.innerText = `This week you slept ${sleepHours[0]} hours on day one,  ${sleepHours[1]} hours on day two, ${sleepHours[2]} hours on day three, ${sleepHours[3]} hours on day four, ${sleepHours[4]} hours on day five, ${sleepHours[5]} hours on day six, and ${sleepHours[6]} hours on day seven.`
}


function displayAllTimeSleepStuff() {
  allTimeSleepParagraph.innerText = `Your all time sleep quality average is ${userSleep.findAllTimeSleepQualityAverage()} out of 10, and your all time average sleep hours is ${userSleep.findAllTimeHoursSleptAverage()} hours`
}

function displayLatestDaySteps() {
  // the below date will need to be passed in dynamically
  dailyStepsParagraph.innerText = `You walked ${userActive.findSpecificStepsWalked("2019/06/15")} steps today. Well... There's always tomorrow!`;
}

function displayLatestMinutesActive() {
  dailyMinutesActiveParagraph.innerText = `You were active for ${userActive.userMinutesActive("2019/06/15")} minutes. Way to go?`;
}

function displayLatestMilesWalked() {
  dailyDistanceWalkedParagraph.innerText = `Sheesh... You seriously walked ${userActive.findMilesWalkedSpecificDay("2019/06/15")} miles today... Do you even own a car?`;
}

function compareUserToAverageDayActivity() {
  stepGoalVsAverageParagraph.innerText = `Woah... You walked ${userActive.findSpecificStepsWalked("2019/06/15")} steps, while errbody else walked an average of ${activityRepository.findAverageNumberOfStepsTakenForADate("2019/06/15")} steps. You were active for ${userActive.userMinutesActive("2019/06/15")} minutes, while errbody else was active an average of ${activityRepository.findAverageMinutesActiveForADate("2019/06/15")} minutes. You climbed ${userActive.findStairsClimbedSpecificDay("2019/06/15")} flights of stairs, while errbody else climbed an average of ${activityRepository.findAverageFlightsOfStairsClimbedForADate("2019/06/15")} flights of stairs. What matters is that you're trying your best, right??`
}

function displayAcitityForWeek() {
  let weeklyInfo = userActive.findActivityWeek("2019/06/15", "2019/06/22");
  let rundownList = weeklyInfo.map(info => {
    return `On day ${weeklyInfo.indexOf(info) + 1} you walked ${info.numSteps} steps, were active for ${info.minutesActive} minutes, and climbed ${info.flightsOfStairs} flights of stairs!`;
  })
  let weeklyRundown = rundownList.join(' ');
  weekActivityParagraph.innerText = `${weeklyRundown}`;
}

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
