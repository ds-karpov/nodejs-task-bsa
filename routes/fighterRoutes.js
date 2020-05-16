const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

// eslint-disable-next-line new-cap
const router = Router();

// @route GET /api/fighters
// @desc Returns all fighters in db
router.get('/', (req, res) => {
  try {
    const fighters = FighterService.getAll();

    if (!fighters) {
      res.status(404).send({
        error: true,
        message: 'Have no fighters'
      });
    }
    res.send(fighters);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route GET /api/fighters/:id
// @desc Returns specific fighter by id
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const foundFighter = FighterService.search({ id });

    if (!foundFighter) {
      res.status(404).send({
        error: true,
        message: 'No fighter with such id'
      });
    }
    res.send(foundFighter);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route POST /api/fighters
// @desc Creates fighter
router.post('/', createFighterValid, (req, res) => {
  const fighter = req.newFighter;
  try {
    const result = FighterService.create(fighter);

    if (!result) {
      res.status(400).send({
        error: true,
        message: 'Non validation error'
      });
    }
    res.send(result);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route PUT /api/fighters/:id
// @desc Changes fighter details by id
router.put('/:id', updateFighterValid, (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  try {
    const updatedFighter = FighterService.update(id, dataToUpdate);

    if (!updatedFighter) {
      res.status(404).json({
        error: true,
        message: 'No fighter with such id'
      });
    }
    res.send(updatedFighter);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

// @route DELETE /api/fighters/:id
// @desc Removes fighter by id
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const fighter = FighterService.delete(id);

    if (!fighter) {
      res.status(404).send({
        error: true,
        message: 'Fighter not found'
      });
    }
    res.send(fighter);
  } catch (e) {
    res.status(500).send({
      error: true,
      message: 'Internal server error'
    });
  }
});

module.exports = router;