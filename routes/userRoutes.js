const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { User } = require('../models/user');
const { responseMiddleware } = require('../middlewares/response.middleware');

// eslint-disable-next-line new-cap
const router = Router();

// @route GET /api/users
// @desc Returns all users in db
router.get('/', (req, res) => {
  try {
    const users = UserService.getUsers();

    if (!users) {
      res.status(400).send({
        error: true,
        message: 'No users in db'
      });
    }
    res.send(users);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route GET /api/users/:id
// @desc Returns specific user by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  try {
    const user = UserService.search({ id });

    if (!user) {
      res.status(404).send({
        error: true,
        message: 'User not found'
      });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route POST /api/users
// @desc Creates user
router.post('/', createUserValid, (req, res) => {
  const user = req.newUser;
  try {
    res.send(UserService.create(user));
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route PUT /api/users/:id
// @desc Updates user information details
router.put('/:id', updateUserValid, (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.body;
    const updatedUser = UserService.update(id, userInfo);

    if (!updatedUser) {
      res.status(404).send({
        error: true,
        message: 'No user with such id'
      });
    }
    res.send(updatedUser);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route DELETE /api/users/:id
// @desc Removes user from db by id
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = UserService.delete(id);

    if (!deletedUser) {
      res.status(404).send({
        error: true,
        message: 'No user with such id'
      });
    }
    res.send(deletedUser);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

module.exports = router;