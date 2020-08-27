const chai = require('chai');
const expect = chai.expect;
const userSamples = require('../data/userSamples');
const UserRepository = require('../src/UserRepository');
const UserSleep = require('../src/UserSleep');


describe('UserSleep', () => {
  let userRepo, userSleep;
  beforeEach( () => {
    userRepo = new UserRepository(userSamples);
    userSleep = new UserSleep(userRepo.findUserInfo(1));
  });

  it('should be a function', () => {
    expect(UserSleep).to.be.a('function');
  });

  it('should gather all of a users sleep data', () => {
    expect(userSleep.userSleepInformation.length).to.equal(8);
  });

  it('should return a users average all time hours slept', () => {
    expect(userSleep.findAllTimeHoursSleptAverage()).to.equal(6);
  });

  it('should return a users average all time sleep quality', () => {
    expect(userSleep.findAllTimeSleepQualityAverage()).to.equal(2);
  });

  it('should return a users hours slept for specified day', () => {
    expect(userSleep.findSpecificDaySleepHours("2019/06/15")).to.equal(6.1);
  });

  it('should return a users sleep quality for specified day', () => {
    expect(userSleep.findSpecificDaySleepQuality("2019/06/15")).to.equal(2.2);
  });

  it('should return a users hours slept for specified week', () => {
    expect(userSleep.weeklySleepHours("2019/06/22")).to.deep.equal([ 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 20 ]);
  });

  it('should return a users sleep quality for specified week', () => {
    expect(userSleep.weeklySleepQuality("2019/06/22")).to.deep.equal([ 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 0.1 ]);
  });
});
