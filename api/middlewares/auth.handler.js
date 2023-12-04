const boom = require('@hapi/boom')

function checkApiKey (req, res, next) {
  const apiKey = req.headers['api-key']
  if (apiKey === process.env.API_KEY) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

module.exports = checkApiKey;