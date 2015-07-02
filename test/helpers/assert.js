function assertPromise(promise, done, cb) {
  promise.then(result => {
    cb(result);
    done();
  }).done(null, done);
}

export default { assertPromise };
