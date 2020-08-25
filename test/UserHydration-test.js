const chai = require('chai');
const expect = chai.expect;
const UserHydration = require('../src/UserHydration');
const UserRepository = require('../src/UserRepository');
const userSamples = require('../data/userSamples')

describe('UserRepository', () => {
  let repo;
  let userHydration;
  beforeEach( () => {
    repo = new UserRepository(userSamples)
    userHydration = new UserHydration(repo.returnUserData(1));
  });

  it('should be a function', () => {
    expect(UserHydration).to.be.a('function');
  });
});
