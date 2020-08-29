const hydrationSamples = require('../data/hydrationSamples');

class HydrationRepository {
  constructor() {
    this.hydroInfo = hydrationSamples;
  }

  obtainUser(userID) {
    return this.hydroInfo.find(userDatum => {
      if (userDatum.userID === userID) {
        return userDatum;
      }
    })
  }

}

module.exports = HydrationRepository;
