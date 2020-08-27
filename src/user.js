class User {
  constructor(userData) {
    this.userData = {
      id: userData.id,
      name: userData.name,
      address: userData.address,
      email: userData.email,
      strideLength: userData.strideLength,
      dailyStepGoal: userData.dailyStepGoal,
      friends: userData.friends
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


module.exports = User;
