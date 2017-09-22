class User {

  constructor(username, password) {

    if (!User.users) {
      // in place of data store:
      User.users = {
        test: {
          username: 'test',
          password: 'test123'
        }
      };
    }

    this.username = username;
    this.password = password;
    User.users[username] = this;
  }

  static findByUsername(username, callback = null) {
    // if (callback) {
    callback(User.users[username]);
    // } else {
    //   return User.users[username];
    // }
  }

  comparePassword(password, callback = null) {
    // if (callback) {
    callback(this.password === password);
    // } else {
    //   return this.password === password;
    // }
  }
}

module.exports = User;
