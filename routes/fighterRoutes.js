const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

// eslint-disable-next-line new-cap
const router = Router();

// TODO: Implement route controllers for fighter

module.exports = router;