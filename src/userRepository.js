// if (typeof(require) !== 'undefined') {
//   const userSamples = require('../data/userSamples');
// }
// // I dont think this require conditional is working how we though it should
// const User = require('../src/user');

class UserRepository {
  constructor(userList) {
    this.listOfUsers = userList;
  }

  findUserInfo(userID) {
    // rename to getUser
    return this.listOfUsers.find(userDatum => {
      if (userDatum.id === userID) {
        return userDatum;
      }
    })
  }

  instantiateUser(userID) {
    return new User(this.findUserInfo(userID));
  }

  findTotalAverageStepGoal() {
    let totalStepGoal = this.listOfUsers.reduce((allStepGoals, userDatum) => {
      return (allStepGoals += userDatum.dailyStepGoal);
    }, 0);
    return Math.floor(totalStepGoal / this.listOfUsers.length);
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = UserRepository;
}
