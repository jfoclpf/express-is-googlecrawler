const axios = require('axios')
const net = require('node:net')

// indeed a whitelist for Googlebot
const blockList = new net.BlockList()

// see for more info: https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot
// JSON with Googlebots IP ranges
const googleBotsUrl = 'https://developers.google.com/static/search/apis/ipranges/googlebot.json'
// JSON with Google crawlers IP ranges
const googleCrawlersUrl = 'https://developers.google.com/static/search/apis/ipranges/special-crawlers.json'

module.exports = { loadIps, isIpfromGoogle }

function loadIps () {
  return new Promise((resolve, reject) => {
    axios.all([
      axios.get(googleBotsUrl, {
        responseType: 'json'
      }),
      axios.get(googleCrawlersUrl, {
        responseType: 'json'
      })
    ])
      .then(axios.spread((googleBots, googleCrawlers) => {
        const googleBotsData = googleBots.data
        const googleCrawlersData = googleCrawlers.data
        const googleIPranges = googleBotsData.prefixes.concat(googleCrawlersData.prefixes)

        googleIPranges
          .filter(el => 'ipv4Prefix' in el)
          .map(el => el.ipv4Prefix)
          .forEach(el => {
            blockList.addSubnet(el.split('/')[0], parseInt(el.split('/')[1]), 'ipv4')
          })
        googleIPranges
          .filter(el => 'ipv6Prefix' in el)
          .map(el => el.ipv6Prefix)
          .forEach(el => {
            blockList.addSubnet(el.split('/')[0], parseInt(el.split('/')[1]), 'ipv6')
          })
        resolve()
      }))
      .catch((error) => {
        console.error('Unable to download or process Google bots/crawlers IP ranges JSON file: ', error.message)
        reject(error)
      })
  })
}

function isIpfromGoogle (ip) {
  // see https://nodejs.org/api/net.html#netisipinput
  const typeIp = net.isIP(ip)
  switch (typeIp) {
    case 4:
      return blockList.check(ip, 'ipv4')
    case 6:
      return blockList.check(ip, 'ipv6')
    default:
      return false
  }
}
