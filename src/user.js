class User {
  constructor(userInfo) {
    this.userData = {
      id: userInfo.id,
      name: userInfo.name,
      address: userInfo.address,
      email: userInfo.email,
      strideLength: userInfo.strideLength,
      dailyStepGoal: userInfo.dailyStepGoal,
      friends: userInfo.friends
    };
  }

  findFirstName() {
    let seperateName = this.userData.name.split(" ");
    let firstName = seperateName.slice(0, -1);
    let firstNameAsString = firstName.toString();
    return firstNameAsString;
    // return this.userData.name.split(" ").slice(0, -1).toString();
  }
}

if (typeof(module) !== 'undefined') {
  module.exports = User;
}
