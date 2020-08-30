const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');

describe('UserActivity', () => {
  let userActivity;
  beforeEach( () => {
    userRepo = new UserActivity();
  });

  it('should be a function', () => {
    expect(UserActivity).to.be.a('function');
  });

});
