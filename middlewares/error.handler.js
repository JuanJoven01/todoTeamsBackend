function errorLogger (error, req, res, next) {
    console.error(error.stack);
    console.log('Error logger', error)
    next(error);
    }


function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    console.log('Boom error handler', error)
    res.status(output.statusCode).json(output.payload);
  }else{
  next(error);
  }
}

function errorHandler (error, req, res, next) {
  console.log('Error handler', error)
  res.status(500).json({ 
        message: error.message,
        stack: error.stack
    });
}



module.exports = {errorHandler, errorLogger, boomErrorHandler};