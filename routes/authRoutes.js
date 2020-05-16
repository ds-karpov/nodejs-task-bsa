const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

// eslint-disable-next-line new-cap
const router = Router();

router.post('/login', (req, res, next) => {
  try {
    const data = AuthService.login({ email: req.body.email, password: req.body.password });

    if (data) {
      res.data = data;
    }
  } catch (err) {
    res.err = err.message;
  } finally {
    next();
  }
}, responseMiddleware);

module.exports = router;