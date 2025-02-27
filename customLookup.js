const dns = require('dns')

// Create a new DNS resolver instance with Google DNS servers to rapidly download the JSON files
const resolver = new dns.Resolver()
resolver.setServers(['8.8.8.8', '8.8.4.4', '2001:4860:4860::8888', '2001:4860:4860::8844'])

function customLookup (hostname, options, callback) {
  // Resolve both IPv4 and IPv6 addresses
  if (options.family === 6) {
    resolver.resolve6(hostname, (err, addresses) => {
      if (err) return callback(err)
      callback(null, addresses[0], 6)
    })
  } else {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err) return callback(err)
      callback(null, addresses[0], 4)
    })
  }
}

module.exports = customLookup
