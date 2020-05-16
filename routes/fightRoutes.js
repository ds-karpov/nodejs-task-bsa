const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');


// eslint-disable-next-line new-cap
const router = Router();

// OPTIONAL TODO: Implement route controller for fights

module.exports = router;