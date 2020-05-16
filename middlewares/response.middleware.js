const responseMiddleware = (req, res, next) => {
  if (res.err) {
    if (res.err === 'User not found') {
      return res.status(404).send({
        error: true,
        message: res.err
      });
    }
  }

  if (res.data) {
    res.send(res.data);
  }

  next();
};

exports.responseMiddleware = responseMiddleware;