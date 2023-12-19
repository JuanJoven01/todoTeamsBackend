require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes/index');

cors = require('cors');

app.use(cors());

const {errorHandler, errorLogger, boomErrorHandler} = require('./middlewares/error.handler');

// to get and use auth strategies
require('./utils/auth/index');

app.get('/', (req, res) => {
    res.send('Developed by JuanJoven01!')
})


app.use(express.json());

routerApi(app);

app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

