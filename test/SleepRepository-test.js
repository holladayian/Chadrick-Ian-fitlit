const chai = require('chai');
const expect = chai.expect;
// const userSamples = require('../data/userSamples');
// const UserRepository = require('../src/UserRepository');
const SleepRepository = require('../src/SleepRepository');
const sleepSamples = require('../data/sleepSamples');
const UserSleep = require('../src/userSleep');

describe('SleepRepository', () => {
  let userRepo, userSleep;
  beforeEach( () => {
    // userRepo = new UserRepository(userSamples);
    sleepRepo = new SleepRepository(sleepSamples);
  });

  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should return an array of sleep info for all users within a specified range of days', () => {
    // sleepRepo.findSleepWeek("2019/06/15", "2019/06/22");
    expect(sleepRepo.findSleepWeek("2019/06/15", "2019/06/22").length).to.equal(21);
  });

  it('should return an average of all sleep quality', () => {
    expect(sleepRepo.findAllUsersAverageSleepQuality()).to.equal(2);
  });

  it('should return an array individual sleep qualities', () => {
    expect(sleepRepo.findSleepQualitiesAverageGreaterThanThree("2019/06/15", "2019/06/22").length).to.equal(2);
  });

});
