import request                         from 'supertest'
import { app }                         from '../src/app'
import { initDatabase, cleanDatabase } from './helpers/db';

function endRequest(err, done) {
  if (err) return done(err);
  done();
}

describe('app', () => {
  before(initDatabase);
  after(cleanDatabase);

  describe('POST /shorten', () => {
    it('succefully shortens URL', (done) => {
      request(app)
        .post('/shorten')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({url: 'http://foo.com'})
        .expect(200, 'http://127.0.0.1/HXRC')
        .end((e) => endRequest(e, done));
    });

    it('responds with 500 for empty query', (done) => {
      request(app)
        .post('/shorten')
        .expect(500)
        .end((e) => endRequest(e, done));
    });
  });

  describe('GET /:code', () => {
    it('redirects to expanded URL', (done) => {
      request(app)
        .get('/HXRC')
        .expect(301, 'Moved Permanently. Redirecting to http://foo.com')
        .end((e) => endRequest(e, done));
    });

    it('responds with 404 for non-existent code', (done) => {
      request(app)
        .get('/HXR')
        .expect(404)
        .end((e) => endRequest(e, done));
    });
  });

  describe('GET /statistics/:code', () => {
    it('expandeds URL', (done) => {
      request(app)
        .get('/statistics/HXRC')
        .expect(200, '1')
        .end((e) => endRequest(e, done));
    });

    it('responds with 404 for non-existent code', (done) => {
      request(app)
        .get('/statistics/HXR')
        .expect(404)
        .end((e) => endRequest(e, done));
    });
  });

  describe('GET /expand/:code', () => {
    it('expandeds URL', (done) => {
      request(app)
        .get('/expand/HXRC')
        .expect(200, 'http://foo.com')
        .end((e) => endRequest(e, done));
    });

    it('responds with 404 for non-existent code', (done) => {
      request(app)
        .get('/expand/HXR')
        .expect(404)
        .end((e) => endRequest(e, done));
    });
  });
});
