import express from 'express';
import routerApi from './routes/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middleware/error.handler.js';

const app = express();
const port = 4000;

app.use(express.json());
//Lee el body en los POST

//recibimos un get a la ruta
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});
app.get('/nueva', (req, res) => {
  res.send('Hola soy una ruta nueva');
});

app.get('/ejemplo', (req, res) => {
  const { data, name } = req.query;
  res.json({
    data,
    name,
  });
});

routerApi(app);
app.use(logErrors);

app.use(boomErrorHandler);
app.use(errorHandler);

//levanta el server en el puerto indicado
app.listen(port, () => {
  console.log('Puerto corriendo en ' + port);
});
