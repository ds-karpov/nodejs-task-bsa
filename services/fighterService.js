const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  constructor(repository) {
    this.repository = repository;
  }

  search(search) {
    const fighter = this.repository.getOne(search);

    if (!fighter) {
      return null;
    }
    return fighter;
  }

  getAll() {
    const fighters = this.repository.getAll();

    if (!fighters) {
      return null;
    }
    return fighters;
  }

  create(data) {
    const fighter = this.repository.create(data);

    if (!fighter) {
      return null;
    }
    return fighter;
  }

  update(id, data) {
    return this.repository.update(id, data);
  }

  delete(id) {
    const fighter = this.repository.delete(id);

    if (!fighter.length) {
      return null;
    }
    return fighter[0];
  }
}

module.exports = new FighterService(FighterRepository);