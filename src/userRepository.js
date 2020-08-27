class UserRepository {
  constructor(data) {
    this.data = data;
  }

  findUserInfo(userID) {
    return this.data.find(userDatum => {
      if (userDatum.id === userID) {
        return userDatum;
      }
    })
  }

  findTotalAverageStepGoal() {
    let totalStepGoal = 0;
    this.data.forEach(userDatum => {
      return (totalStepGoal += userDatum['dailyStepGoal']);
    })
    return Math.floor(totalStepGoal / this.data.length);
  }
}



module.exports = UserRepository;
