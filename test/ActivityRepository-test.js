const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');
const ActivityRepository = require('../src/ActivityRepository');


describe('ActivityRepository', () => {
  let activityRepo, userActivity;
  beforeEach( () => {
    activityRepo = new ActivityRepository();
    // userActivity = new UserActivity();

  });

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should have a method to return user data', () => {
    expect(activityRepo.obtainActivityUser(1)[0]).to.deep.equal(
      {
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    })
  });

  it('instantiate a new UserActivity', () => {
    expect(activityRepo.instantiateUserActivity(1)).to.be.an.instanceof(UserActivity)
  })

});
