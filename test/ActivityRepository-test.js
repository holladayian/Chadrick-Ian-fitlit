const chai = require('chai');
const expect = chai.expect;
const UserActivity = require('../src/UserActivity');
const ActivityRepository = require('../src/ActivityRepository');


describe('ActivityRepository', () => {
  let activityRepo, userActivity;
  beforeEach( () => {
    activityRepo = new ActivityRepository();
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
    expect(activityRepo.instantiateUserActivity(1)).to.be.an.instanceof(UserActivity);
  });

  it('should find a date for all activities', () => {
    expect(activityRepo.findDateForActivity("2019/06/15").length).to.equal(3);
  });

  it('should calculate the number of stairs climbed for a specific date', () => {
    expect(activityRepo.findAverageFlightsOfStairsClimbedForADate("2019/06/15")).to.equal(19);
  });

  it('should calculate the number of steps taken for a specific date', () => {
    expect(activityRepo.findAverageNumberOfStepsTakenForADate("2019/06/15")).to.equal(5091);
  });

  it('should calculate the number of steps taken for a specific date', () => {
    expect(activityRepo.findAverageMinutesActiveForADate("2019/06/15")).to.equal(131);
  });

  it('should check for the laziest person in a given day', () => {
    expect(activityRepo.findLaziestPersonForADate("2019/06/15")).to.deep.equal(
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      }
    )
  });

  it('should find a user\'s friends', () => {
    expect(activityRepo.findFriends(1).length).to.equal(2);
  })
  //
  // it('should find friends step counts for a week', () => {
  //   expect(activityRepo.findFriendStepCountForAWeek(1).length).to.equal(3);
  // })

  // to find this, I think we can just activityRepo.findFriends(1).map(friend => friend.findTotalStepsForAWeek(startDate, endDate)) in scripts
});
