const chai = require('chai');
const expect = chai.expect;
const userSamples = require('../data/userSamples');
const hydrationSamples = require('../data/hydrationSamples');
const HydrationRepository = require('../src/HydrationRepository');
const UserHydration = require('../src/userHydration');

describe('HydrationRepository', () => {
  let hydroRepo;
  beforeEach( () => {
    hydroRepo = new HydrationRepository(hydrationSamples);
  });

  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function');
  });

  it('should be an instance of the HydrationRepository Class', () => {
    expect(hydroRepo).to.be.an.instanceof(HydrationRepository);
  });
});
