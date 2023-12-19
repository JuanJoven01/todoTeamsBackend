function errorLogger (error, req, res, next) {
  console.log('entering to error logger')
    console.log('Error logger', error)
    console.error(error.stack, 'is this the error');
    
    next(error);
    }


function boomErrorHandler (error, req, res, next) {
  console.log('entering to boom error handler')
  if (error.isBoom) {
    const { output } = error;
    console.log('Boom error handler', error)
    res.status(output.statusCode).json(output.payload);
  }else{
  next(error);
  }
}

function errorHandler (error, req, res, next) {
  console.log('entering to error handler')
  console.log('Error handler', error)
  res.status(500).json({ 
        message: error.message,
        stack: error.stack
    });
}



module.exports = {errorHandler, errorLogger, boomErrorHandler};