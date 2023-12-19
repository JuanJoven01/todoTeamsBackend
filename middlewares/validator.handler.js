const boom = require('@hapi/boom')

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false })
    error ? next(boom.badRequest(error.details)) : next()
  }
}

module.exports = validatorHandler;

// (error) (error.details) --> change made