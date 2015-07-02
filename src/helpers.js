function urlForCode(req, code) {
  const hasPort = req.port && req.port != 80;

  let url = `${ req.protocol }://${ req.hostname }`;
  if (hasPort) url += `:${ req.port }`
  url += `/${ code }`;

  return url;
}

export default { urlForCode };
