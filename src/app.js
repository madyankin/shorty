import express        from 'express';
import { urlencoded } from 'body-parser';
import promise        from 'express-promise';
import db             from './db';
import routes         from './routes';

const app         = express();
const bodyParser  = urlencoded({ extended: true });

function errorLogger(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.sendStatus(500);
}

app.use(promise());
app.use(bodyParser);
app.use('/', routes);

app.use(errorLogger);
app.use(errorHandler);

function start() {
  const server = app.listen(3000, () => {
    const { address, port } = server.address();
    console.log(`Shorty is listening at http://${ address }:${ port }`);
  });
}

export default { app, start };
