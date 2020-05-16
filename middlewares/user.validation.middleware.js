const { user } = require('../models/user');
const UserService = require('../services/userService');
const { userExists, fieldsValidation } = require('../validation');

const userSchema = Object.assign({}, user);
delete userSchema.id;

const createUserValid = (req, res, next) => {
  const newUser = req.body;
  try {
    // eslint-disable-next-line no-prototype-builtins
    if (!Object.keys(userSchema).every(key => newUser.hasOwnProperty(key))) {
      return res.status(400).send({
        error: true,
        message: 'All fields must be filled in.'
      });
    }

    const errors = fieldsValidation(UserService, req.body);

    if (errors.length) {
      return res.status(400).send({
        error: true,
        message: errors
      });
    }

    const { email, firstName, lastName, password, phoneNumber } = newUser;
    req.newUser = { email, firstName, lastName, password, phoneNumber };
    next();
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

const updateUserValid = (req, res, next) => {
  try {
    if (!userExists(UserService, { id: req.params.id })) {
      return res.status(404).send({
        error: true,
        message: 'User not found'
      });
    }

    const allowedUpdates = Object.keys(userSchema);
    const reqUpdates = Object.keys(req.body);
    const isValidUpdate = reqUpdates.every(field => allowedUpdates.includes(field));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: true,
        message: 'Invalid updates'
      });
    }

    const errors = fieldsValidation(req.body);

    if (errors.length) {
      return res.status(400).send({
        error: true,
        message: errors
      });
    }
    next();
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
