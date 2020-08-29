class UserRepository {
  constructor(data) {
    this.data = data;
  }

  findUserInfo(userID) {
    // rename to getUser
    return this.data.find(userDatum => {
      if (userDatum.id === userID) {
        return userDatum;
      }
    })
  }

  findTotalAverageStepGoal() {
    let totalStepGoal = this.data.reduce((accumulator, userDatum) => {
      return (accumulator += userDatum['dailyStepGoal']);
    }, 0);
    return Math.floor(totalStepGoal / this.data.length);
  }
}



module.exports = UserRepository;
