const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');
const ActivityRepository = require('../src/ActivityRepository');

describe('UserActivity', () => {
  let userActivity, activityRepo;
  beforeEach( () => {
    // userActivity = new UserActivity();
    activityRepo = new ActivityRepository();
    userActivity = activityRepo.instantiateUserActivity(1);
  });

  it('should be a function', () => {
    expect(UserActivity).to.be.a('function');
  });

  it('should return user stride length', () => {
    expect(userActivity.findUserStride()).to.equal(4.3);
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
});
