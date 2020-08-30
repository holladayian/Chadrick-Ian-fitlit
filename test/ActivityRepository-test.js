const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');
const ActivityRepository = require('../src/ActivityRepository');


describe('ActivityRepository', () => {
  let activityRepo, userActivity;
  beforeEach( () => {
    activityRepo = new ActivityRepository();
    userActivity = new UserActivity();

  });

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('shoiuld instantiate a new UserActivity', =>{
    expect(activityRepo.instantiateActiveUser()).to.be.an.instanceof(UserActivity)
  })

});
