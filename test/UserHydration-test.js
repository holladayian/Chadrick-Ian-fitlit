const chai = require('chai');
const expect = chai.expect;
const hydrationSamples = require('../data/hydrationSamples');
const UserHydration = require('../src/UserHydration');
const HydrationRepository = require('../src/HydrationRepository');


describe('UserHydration', () => {
  let userRepo, userHydration;
  beforeEach( () => {
    hydroRepo = new HydrationRepository(hydrationSamples);
    userHydration = new UserHydration(hydroRepo.obtainUser(1));
  });

  it('should be a function', () => {
    expect(UserHydration).to.be.a('function');
  });

  it('should gather all of a users hydration data', () => {
    expect(userHydration.userHydrationInformation.length).to.equal(8);
  });

  it('should return a users average all time hydration', () => {
    expect(userHydration.findAllTimeHydrationAverage()).to.equal(62);
  });

  it('should return a users hydration for specific date', () => {
    expect(userHydration.findSpecificDayHydration("2019/06/15")).to.equal(37);
  });

  it('should return how many fluid ounces of water consumed each day over the course of a week (7 days)', () => {
    expect(userHydration.weeklyHydration("2019/06/15", "2019/06/22")).to.deep.equal(
      [
        69, 68, 67, 66,
        65, 64, 63
      ]
    );
  });
});
