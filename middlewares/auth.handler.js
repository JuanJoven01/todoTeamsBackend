const boom = require('@hapi/boom')

function checkApiKey (req, res, next) {
  const apiKey = req.headers['api-key']
  if (apiKey === '1234') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

module.exports = checkApiKey;