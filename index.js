const path = require('path')
const { loadIps, isIpfromGoogle } = require(path.join(__dirname, 'main.js'));

(async () => {
  // loads Google known IPs into memory
  await loadIps()
})()

module.exports = (req, res, next) => {
  res.locals.isGoogleCrawler = isIpfromGoogle(req.ip)
  next()
}
