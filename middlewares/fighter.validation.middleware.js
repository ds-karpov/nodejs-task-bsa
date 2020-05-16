const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');
const { fieldsValidation, fighterExists } = require('../validation');

const fighterSchema = Object.assign({}, fighter);
delete fighterSchema.id;

const createFighterValid = (req, res, next) => {
  const newFighter = req.body;
  try {
    // eslint-disable-next-line no-prototype-builtins
    if (!Object.keys(fighterSchema).every(key => newFighter.hasOwnProperty(key))) {
      return res.status(400).send({
        error: true,
        message: 'All fields must be filled in.'
      });
    }

    const errors = fieldsValidation(FighterService, req.body);

    if (errors.length) {
      return res.status(400).send({
        error: true,
        message: errors
      });
    }

    const { name, power, health, defense } = newFighter;
    req.newFighter = { name, power, health, defense };
    next();
  } catch (e) {
    res.status(500).send({ // TODO move to error handler middleware
      error: true,
      message: 'Internal server error'
    });
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    if (!fighterExists(FighterService, { id: req.params.id })) {
      return res.status(404).send({
        error: true,
        message: 'Fighter not found'
      });
    }

    const allowedUpdates = Object.keys(fighterSchema);
    const reqUpdates = Object.keys(req.body);
    const isValidUpdate = reqUpdates.every(field => allowedUpdates.includes(field));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: true,
        message: 'Invalid updates'
      });
    }

    const errors = fieldsValidation(FighterService, req.body);

    if (errors.length) {
      return res.status(400).send({
        error: true,
        message: errors
      });
    }
    next();
  } catch (e) {
    res.status(500).send({ // TODO move to error handler middleware
      error: true,
      message: 'Internal server error'
    });
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;