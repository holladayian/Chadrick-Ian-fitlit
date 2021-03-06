// const UserActivity = require('../src/userActivity');
// const UserRepository = require('../src/userRepository');
// // const userRepository = new UserRepository(userData);


class ActivityRepository {

  constructor(userInfo) {
    this.activityInformation = userInfo;
  }

  obtainActivityUser(id) {
    return this.activityInformation.filter(userInfo => {
      if (userInfo.userID === id) {
        return userInfo;
      }
    })
  }

  instantiateUserActivity(id) {
    return new UserActivity(this.obtainActivityUser(id), this.findUser(id));
  }

  findUser(id) {
    return userRepository.instantiateUser(this.obtainActivityUser(id)[0].userID);
  }

  findFriends(id) {
    let friendList = [];
     this.findUser(id).friends.forEach(friendID => {
      friendList.push(this.instantiateUserActivity(friendID))
    })
    return friendList
  }

  findAverageFlightsOfStairsClimbedForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalFlightsOfStairsClimbed = specifiedDate.reduce((totalStairs, day) => {
      return totalStairs += day.flightsOfStairs;
    }, 0)
    return Math.floor(totalFlightsOfStairsClimbed / specifiedDate.length)
  }

  findAverageNumberOfStepsTakenForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalNumberOfStepsTaken = specifiedDate.reduce((totalSteps, day) => {
      return totalSteps += day.numSteps;
    }, 0)
    return Math.floor(totalNumberOfStepsTaken / specifiedDate.length)
  }

  findAverageMinutesActiveForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let totalMinutesActive = specifiedDate.reduce((totalMins, day) => {
      return totalMins += day.minutesActive;
    }, 0)
    return Math.floor(totalMinutesActive / specifiedDate.length);
  }

  findLaziestPersonForADate(date) {
    let specifiedDate = this.findDateForActivity(date);
    let listOfMinutesActive = specifiedDate.map(userActiveDay => userActiveDay.minutesActive);
    let lazziestPerson = specifiedDate.find(usersDay => {
      if(usersDay.minutesActive === Math.min(...listOfMinutesActive)) {
        return usersDay;
      }
    });
    return lazziestPerson;
  }

  findDateForActivity(specifiedDate) {
    return this.activityInformation.filter(day => day.date === specifiedDate);
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = ActivityRepository;
}
