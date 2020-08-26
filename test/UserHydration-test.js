const chai = require('chai');
const expect = chai.expect;
const UserHydration = require('../src/UserHydration');
const UserRepository = require('../src/UserRepository');
const userSamples = require('../data/userSamples')

describe('UserHydration', () => {
  let repo;
  let userHydration;
  beforeEach( () => {
    repo = new UserRepository(userSamples)
    userHydration = new UserHydration(repo.returnUserData(1));
  });

  it('should be a function', () => {
    expect(UserHydration).to.be.a('function');
  });

  it('should gather all of a users hydration data', () => {
    expect(userHydration.userHydrationData.length).to.equal(7);
  });

  it('should return a users average all time hydration', () => {
    expect(userHydration.allTimeHydrationAverage()).to.equal(62);
  });
});
