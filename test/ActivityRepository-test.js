const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');
const ActivityRepository = require('../src/ActivityRepository');


describe('ActivityRepository', () => {
  let activityRepo;
  beforeEach( () => {
    activityRepo = new ActivityRepository();
  });

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

});
