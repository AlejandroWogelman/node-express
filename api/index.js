import express from 'express';
import cors from 'cors';

import routerApi from './routes/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middleware/error.handler.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
//Lee el body en los POST

const whitelist = [
  'http://localhost:8080',
  'http://localhost:4000',
  'https://myapp.com',
  'http://127.0.0.1:5500',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));

//recibimos un get a la ruta
app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});
app.get('/api/nueva', (req, res) => {
  res.send('Hola soy una ruta nueva');
});

app.get('/api/ejemplo', (req, res) => {
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
