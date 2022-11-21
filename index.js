const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

const {logError, errorHandler, boomErrorHandler} = require('./midlewares/error.handler');

app.use(express.json())

app.get('/',(req, res) => {
    res.send('Hola nuevamente desde el server Express');
});

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Express server ACTIVO: " + port);
});
