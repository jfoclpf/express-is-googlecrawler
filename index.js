const { loadIps, isIpfromGoogle } = require('./main.js');

(async () => {
  // loads Google known IPs into memory
  await loadIps()
})()

module.exports = (req, res, next) => {
  res.locals.isGoogleCrawler = isIpfromGoogle(req.ip)
  next()
}
