const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

// eslint-disable-next-line new-cap
const router = Router();

// TODO: Implement route controllers for user

module.exports = router;