const { UserRepository } = require('../repositories/UserRepository');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  create(user) {
    return this.repository.create(user);
  }

  getUsers() {
    const users = this.repository.getAll();

    if (!users) {
      return null;
    }
    return users;
  }

  update(id, data) {
    const updatedUser = this.repository.update(id, data);

    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  }

  delete(id) {
    const removedUser = this.repository.delete(id);

    if (!removedUser) {
      return null;
    }
    return removedUser;
  }

  search(search) {
    const item = this.repository.getOne(search);

    if (!item) {
      return null;
    }
    return item;
  }
}

module.exports = new UserService(UserRepository);