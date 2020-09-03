const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/userActivity');
const UserRepository = require('../src/userRepository');
const ActivityRepository = require('../src/ActivityRepository');
const activitySamples = require('../data/activitySamples');
const userSamples = require('../data/userSamples');
// const userRepository = new UserRepository(userData);

describe('UserActivity', () => {
  let userActivity, activityRepo2;
  beforeEach( () => {
    // userActivity = new UserActivity();
    activityRepo2 = new ActivityRepository(activitySamples);

    userActivity = activityRepo2.instantiateUserActivity(1);
    // userActivity = new UserActivity(activitySamples[0], userSamples[0]);
    // userActivity = activityRepo.instantiateUserActivity(1);
    // activityRepo = new ActivityRepository();
    // userActivity = activityRepo.instantiateUserActivity(1);
  });

  it('should be a function', () => {
    expect(UserActivity).to.be.a('function');
  });

  it('should return user stride length', () => {
    console.log(userSamples[0]);
    expect(userActivity.user.strideLength).to.equal(4.3);
  })

  it('should return miles walked for a specific day', () => {
    expect(userActivity.findMilesWalkedSpecificDay("2019/06/15")).to.equal(2.91);
  })

  it('should return user minutes active for a specific day', () => {
    expect(userActivity.userMinutesActive("2019/06/15")).to.equal(140);
  })

  it('should return users average minutes active for a specific week', () => {
    expect(userActivity.minutesActiveWeekAverage("2019/06/15", "2019/06/22")).to.equal(167);
  })

  it('should find out user reached their step goal for specific day', () => {
    expect(userActivity.findOutDayStepGoalReached("2019/06/15")).to.equal(false);
  })

  it('should return days where user exceeded their step goal', () => {
    expect(userActivity.findAllDaysStepGoalExceeded()).to.deep.equal([]);
  })

  it('should return days where user exceeded their step goal', () => {
    expect(userActivity.findAllDaysStepGoalExceeded()).to.deep.equal([]);
  })

  it('should return all time stair climbing record', () => {
    expect(userActivity.findAllTimeStairRecord()).to.deep.equal({
      "userID": 1,
      "date": "2019/06/16",
      "numSteps": 6637,
      "minutesActive": 175,
      "flightsOfStairs": 36
    });
  })
});
