const UserService = require('./userService');

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  login(userData) {
    const user = this.repository.search(userData);

    if (!user) {
      throw Error('User not found');
    }
    return user;
  }
}

module.exports = new AuthService(UserService);