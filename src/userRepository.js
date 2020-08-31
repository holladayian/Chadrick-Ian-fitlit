const userSamples = require('../data/userSamples');
const User = require('../src/user');



class UserRepository {
  constructor() {
    this.data = userSamples;
  }

  findUserInfo(userID) {
    // rename to getUser
    return this.data.find(userDatum => {
      if (userDatum.id === userID) {
        return userDatum;
      }
    })
  }

  instantiateUser(userID) {
    return new User(this.findUserInfo(userID));
  }

  findTotalAverageStepGoal() {
    let totalStepGoal = this.data.reduce((accumulator, userDatum) => {
      return (accumulator += userDatum['dailyStepGoal']);
    }, 0);
    return Math.floor(totalStepGoal / this.data.length);
  }
}



module.exports = UserRepository;
