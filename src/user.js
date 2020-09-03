class User {
  constructor(userInfo) {
    this.id = userInfo.id,
    this.name = userInfo.name,
    this.address = userInfo.address,
    this.email = userInfo.email,
    this.strideLength = userInfo.strideLength,
    this.dailyStepGoal = userInfo.dailyStepGoal,
    this.friends = userInfo.friends
  }

  findFirstName() {
    let seperateName = this.name.split(" ");
    let firstName = seperateName.slice(0, -1);
    let firstNameAsString = firstName.toString();
    return firstNameAsString;
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = User;
}
