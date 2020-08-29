const hydrationSamples = require('../data/hydrationSamples');
const UserHydration = require('../src/userHydration');


class HydrationRepository {
  constructor() {
    this.hydroInfo = hydrationSamples;
  }

  obtainUser(userID) {
    return this.hydroInfo.filter(userDatum => {
      if (userDatum.userID === userID) {
        return userDatum;
      }
    })
  }

  instantiateHydroUser(userID) {
    return new UserHydration(this.obtainUser(userID));
  }
}

module.exports = HydrationRepository;
