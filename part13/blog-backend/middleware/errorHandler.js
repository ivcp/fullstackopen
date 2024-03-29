const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).send({ error: error.errors[0].message });
  }

  next(error);
};

module.exports = errorHandler;
