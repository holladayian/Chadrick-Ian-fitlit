const UserActivity = require('../src/UserActivity');
const activitySamples = require('../data/activitySamples');

class ActivityRepository {
  constructor() {
    this.activityInformation = activitySamples;

  }

  obtainActivityUser(id) {
    return this.activityInformation.filter(userInfo => {
      if (userInfo.userID === id) {
        return userInfo
      }
    })
  }
  instantiateUserActivity(id) {
    return new UserActivity(this.obtainActivityUser(id));
  }

  findAverageFlightsOfStairsClimbedForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalFlightsOfStairsClimbed = specifiedDate.reduce((totalStairs, day) => {
      return totalStairs += day.flightsOfStairs
    }, 0)
    return Math.floor(totalFlightsOfStairsClimbed / specifiedDate.length)
  }

  findAverageNumberOfStepsTakenForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalNumberOfStepsTaken = specifiedDate.reduce((totalSteps, day) => {
      return totalSteps += day.numSteps
    }, 0)
    return Math.floor(totalNumberOfStepsTaken / specifiedDate.length)
  }

  findAverageMinutesActiveForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalMinutesActive = specifiedDate.reduce((totalMins, day) => {
      return totalMins += day.minutesActive
    }, 0)
    return Math.floor(totalMinutesActive / specifiedDate.length)
  }

  findLaziestPersonForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let listOfMinutesActive = specifiedDate.map(userActiveDay => userActiveDay.minutesActive);
    let lazziestPerson = specifiedDate.find(usersDay => {
      if(usersDay.minutesActive === Math.min(...listOfMinutesActive)) {
        return usersDay
      }
    });
    return lazziestPerson
  //   let sleepUsersDay = sleepUsers.map(sleepUser => sleepUser.findStartDateInfo(day));
  //   let listOfHoursSlept = sleepUsersDay.map(sleepUserHours => sleepUserHours.hoursSlept);
  //   let sleepWinner = sleepUsersDay.find(sleepUser => {
  //     if (sleepUser.hoursSlept === Math[`${direction}`](...listOfHoursSlept)) {
  //       return sleepUser
  //     }
  //   })
  //   return sleepWinner
  // }

  }

  findDateForActivity(specifiedDate) {
    return this.activityInformation.filter(day => day.date === specifiedDate)
  }
}

module.exports = ActivityRepository;
