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
});
