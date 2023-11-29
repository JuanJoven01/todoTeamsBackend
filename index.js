const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes/index');


const {errorHandler, errorLogger, boomErrorHandler} = require('./middlewares/error.handler');

require('./utils/auth/index');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


app.use(express.json());
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);


routerApi(app);