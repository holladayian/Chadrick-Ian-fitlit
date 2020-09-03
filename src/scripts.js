let theSelectedDate, user, userSleep, userHydro, userActive;
const userRepository = new UserRepository(userData);
const hydrationRepository = new HydrationRepository(hydrationData);
const sleepRepository = new SleepRepository(sleepData);
const activityRepository = new ActivityRepository(activityData);
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
const compareUserActivityParagraph = document.querySelector(".compare-user-activity-paragraph");
const weekActivityParagraph = document.querySelector(".week-activity-paragraph");
const weekSleepParagraph = document.querySelector(".week-sleep-paragraph");
const allTimeSleepParagraph = document.querySelector(".all-time-sleep-paragraph");
const stepGoalVsAverageParagraph = document.querySelector(".step-goal-vs-average-paragraph");
const dailyStepsParagraph = document.querySelector(".daily-steps-paragraph");
const dailyMinutesActiveParagraph = document.querySelector(".daily-minutes-active-paragraph");
const dailyDistanceWalkedParagraph = document.querySelector(".daily-distance-walked-paragraph");
const sleepExtremists = document.querySelector(".sleep-extremists-widget");
const laziestPerson = document.querySelector(".laziest-person-widget");
const winnerOfFriendChallenge = document.querySelector(".most-active-friend-paragraph");
const selectableScrollBox = document.querySelector(".selectbox-scrollable");

window.addEventListener('onload', loadInfoForDashboard());
submitDateButton.addEventListener('click', validateDate);

function loadInfoForDashboard() {
  // the "1" below needs to be dynamic
  instantiateUsers(1);
  fillOutWelcome();
  compareSteps();
  displayAllTimeSleepStuff();
  fillOutUserInfoCard();
  findADate();
}

function instantiateUsers(id) {
  user = userRepository.instantiateUser(id);
  userSleep = sleepRepository.instantiateUserSleep(id);
  userHydro = hydrationRepository.instantiateHydroUser(id);
  userActive = activityRepository.instantiateUserActivity(id);
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
  compareUserActivityParagraph.innerText = `Your daily step goal is ${user.dailyStepGoal} steps, while the average step goal of everybody else is ${userRepository.findTotalAverageStepGoal()} steps. Your expectations might be too high for your level of physical prowess... LOL.`
}

function displayTodaysWaterConsumption(startDate) {
  dailyWaterParagraph.innerText = `You drank ${userHydro.findSpecificDayHydration(startDate)} ounces of pond water this day! Watch out for them gators! `
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
    return `On day ${sleepHours.indexOf(day) + 1} you only slept ${day} hours!`;
  })
  let weeklySleep = sleepDayList.join(' ');
  weekSleepParagraph.innerText = `${weeklySleep}`;
}

function displaySleepOutliers(startDate) {
  let sleepWinner = userRepository.instantiateUser(sleepRepository.whoIsTheSleepOutlier(startDate, "max").userID);
  let sleepLoser = userRepository.instantiateUser(sleepRepository.whoIsTheSleepOutlier(startDate, "min").userID);
  sleepExtremists.innerText = `${sleepWinner.name} slept the most on ${startDate}, and ${sleepLoser.name} slept the least! ${sleepLoser.findFirstName()}, try to be more like ${sleepWinner.findFirstName()}.`;
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

function displayFriendChallenge(startDate, endDate) {
  let friends = activityRepository.findFriends(1);
  let friendSteps = friends.map(friend => friend.findTotalStepsForAWeek(startDate, endDate));
  let friendWinner = friends.find(friend => {
    if (friend.findTotalStepsForAWeek(startDate, endDate) === Math.max(...friendSteps)) {
      return friend
    }
    })
    winnerOfFriendChallenge.innerText = `${friendWinner.user.name} was the most active friend for this week. Did you even try?`
}

function displayLaziestPerson(startDate) {
  let lazzyPerson = userRepository.instantiateUser(activityRepository.findLaziestPersonForADate(startDate).userID);
  laziestPerson.innerText = `${lazzyPerson.name} was the laziest person this day! congrats!!`
}

function compareUserToAverageDayActivity(startDate) {
  stepGoalVsAverageParagraph.innerText = `Wow! You walked ${userActive.findSpecificStepsWalked(startDate)} steps, while everybody else walked an average of ${activityRepository.findAverageNumberOfStepsTakenForADate(startDate)} steps. You were active for ${userActive.userMinutesActive(startDate)} minutes, while everybody else was active an average of ${activityRepository.findAverageMinutesActiveForADate(startDate)} minutes. You climbed ${userActive.findStairsClimbedSpecificDay(startDate)} flights of stairs, while everybody else climbed an average of ${activityRepository.findAverageFlightsOfStairsClimbedForADate(startDate)} flights of stairs. What matters is that your friends are doing better than you. Ha ha ha.`
}

function displayAcitityForWeek(startDate, endDate) {
  let weeklyInfo = userActive.findActivityWeek(startDate, endDate);
  let rundownList = weeklyInfo.map(info => {
    return `On day ${weeklyInfo.indexOf(info) + 1} you walked ${info.numSteps} steps, were active for ${info.minutesActive} minutes, and climbed ${info.flightsOfStairs} flights of stairs! Oh well!`;
  })
  let weeklyRundown = rundownList.join(' ');
  weekActivityParagraph.innerText = `${weeklyRundown}`;
}

function validateDate(event) {
  const submitDateInput = document.querySelector(".submit-date-input");
  let findDate = userSleep.userSleepInformation.find(day => {
    return day.date === submitDateInput.value
    })
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
  displayAcitityForWeek(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  compareUserToAverageDayActivity(selectDate(thisSelectedDate));
  displayLatestMilesWalked(selectDate(thisSelectedDate));
  displayLatestMinutesActive(selectDate(thisSelectedDate));
  displayLatestDaySteps(selectDate(thisSelectedDate));
  displaySleepWeek(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  displaySleepDay(selectDate(thisSelectedDate));
  displayWeeklyWaterConsumption(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
  displayTodaysWaterConsumption(selectDate(thisSelectedDate));
  displaySleepOutliers(selectDate(thisSelectedDate));
  displayLaziestPerson(selectDate(thisSelectedDate));
  displayFriendChallenge(findBeginningOfWeek(thisSelectedDate), selectDate(thisSelectedDate));
}

function selectDate(day) {
  return moment(day, 'YYYY/MM/DD').format('YYYY/MM/DD');
}

function findBeginningOfWeek(day) {
  return moment(day, 'YYYY/MM/DD').subtract(7, 'days').format('YYYY/MM/DD');
}

selectDate("2019/06/15");
findBeginningOfWeek("2019/06/15");
