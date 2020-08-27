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
});
