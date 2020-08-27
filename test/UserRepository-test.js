const chai = require('chai');
const expect = chai.expect;
const userSamples = require('../data/userSamples');
const UserRepository = require('../src/UserRepository');

describe('UserRepository', () => {
  let userRepo;
  beforeEach( () => {
    userRepo = new UserRepository(userSamples);

  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should take in user data', () => {
    expect(userRepo.data[0]).to.deep.equal(
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

  it('should have a method to return user data', () => {
    expect(userRepo.findUserInfo(1)).to.deep.equal(
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

  it('should have a method to return the average step goal amongst all users', () => {
    expect(userRepo.findTotalAverageStepGoal()).to.equal(6666);
  });
});
