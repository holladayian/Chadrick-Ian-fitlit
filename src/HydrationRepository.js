  const UserHydration = require('../src/userHydration');

class HydrationRepository {
  constructor(userData) {
    this.hydroInfo = userData;
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

if (typeof(module) !== 'undefined') {
  module.exports = HydrationRepository;
}
