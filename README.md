# express-is-googlecrawler

Very fast Express middleware that informs if request originates from a Googlebot.

Instead of making a new DNS request for every incoming request, it stores in-memory all [IP ranges coming from Google bots and crawlers](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot), for very fast middleware processing.

## Install

```sh
npm i express-is-googlecrawler
```



