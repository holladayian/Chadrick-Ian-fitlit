const chai = require('chai');
const expect = chai.expect;
const userSamples = require('../data/userSamples');
const UserRepository = require('../src/UserRepository');
const User = require('../src/User');

describe('UserRepository', () => {
  let userRepo, user;
  beforeEach( () => {
    userRepo = new UserRepository(userSamples);
    user = new User(userRepo.findUserInfo(1));
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should take in a single user data', () => {
    expect(user.userData).to.deep.equal(
      {
        "id": 1,
        "name": "Luisa Hane",
        "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
        "email": "Diana.Hayes1@hotmail.com",
        "strideLength": 4.3,
        "dailyStepGoal": 10000,
        "friends": [
          16,
          4,
          8
        ]
      }
    );
  });

  it('should have proper key/values for user data', () => {
    expect(user.userData.id).to.equal(1);
  });

  it('should return users first name only', () => {
    expect(user.findFirstName()).to.equal('Luisa');
  });
});
