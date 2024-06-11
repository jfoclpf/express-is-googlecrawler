/* global describe, it, before */

const path = require('path')
const expect = require('expect.js')
const { loadIps, isIpfromGoogle } = require(path.join(__dirname, '..', 'main.js'))

describe('Google bots/crawlers IPs', async function () {
  before(async () => {
    await loadIps()
  })
  describe('ipv4', function () {
    it('IP 74.125.218.0 does belong to Google', async () => {
      expect(isIpfromGoogle('74.125.218.0')).to.equal(true)
    })
    it('IP 192.168.1.73 does not belong to Google', async () => {
      expect(isIpfromGoogle('192.168.1.73')).to.equal(false)
    })
  })
  describe('ipv6', function () {
    it('IP 2001:4860:4801:2066:0000:0000:0000:0000 does belong to Google', async () => {
      expect(isIpfromGoogle('2001:4860:4801:2066:0000:0000:0000:0000')).to.equal(true)
    })
    it('IP 2001:4860:4801:2066:ffff:ffff:ffff:ffff does belong to Google', async () => {
      expect(isIpfromGoogle('2001:4860:4801:2066:ffff:ffff:ffff:ffff')).to.equal(true)
    })
    it('IP 2001:8a0:6c61:ce00:571b:a672:5668:564f does not belong to Google', async () => {
      expect(isIpfromGoogle('2001:8a0:6c61:ce00:571b:a672:5668:564f')).to.equal(false)
    })
  })
})
