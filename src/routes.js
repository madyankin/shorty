import { Router }     from 'express';
import { urlForCode } from './helpers';
import record         from './record';

const router = Router();

router.post('/shorten', (req, res) => {
  const result = record
    .shorten(req.body.url)
    .then(code => urlForCode(req, code));

  res.send(result);
});

router.get('/expand/:code', (req, res) => {
  const result = record
    .expand(req.params.code)
    .catch(e => res.sendStatus(404));

  res.send(result);
});

router.get('/statistics/:code', (req, res) => {
  const result = record
    .stats(req.params.code)
    .then(count => count.toString())
    .catch(e => res.sendStatus(404));

  res.send(result);
});

router.get('/:code', (req, res) => {
  record
    .log(req.params.code)
    .then(record.expand)
    .then(url => res.redirect(301, url))
    .catch(e => res.sendStatus(404));
});

export default router;
