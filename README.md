# express-is-googlecrawler

Very fast Express middleware that informs if request originates from a Google Bot or a Google Crawler.

Instead of making a new DNS request for every incoming request or checking the HTTP Header `User-Agent` which is not reliable, this middleware stores in-memory all known [IP ranges coming from Google bots and crawlers](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot), for very fast middleware processing.

## Install

```sh
npm i express-is-googlecrawler
```

## Usage

```js
const express = require('express')
const isGoogleCrawler = require('express-is-googlecrawler')

const app = express()
app.use(isGoogleCrawler)

app.get('/', (req, res) => {
  res.send(res.locals.isGoogleCrawler) // Boolean
})

app.listen(3000)
```
