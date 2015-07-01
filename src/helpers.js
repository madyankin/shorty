function urlForCode(req, code) {
  let url = `${ req.protocol }://${ req.hostname }/`;
  if (req.port !== 80) url += `:${ req.port }`;
  url += `/${ code }`

  return code;
}

export default { urlForCode };
