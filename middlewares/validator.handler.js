const boom = require('@hapi/boom')

function validatorHandler (schema, property) {
  console.log('validator handler, entering to validate')
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false })
    console.log('validator handler', error)
    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validatorHandler;

// (error) (error.details) --> change made