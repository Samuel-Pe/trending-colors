### Twitter colors v0.1 ###

## Set up ##
+ Install npm and Node.js
+ Install twit (Twitter API with Node.js):
npm install twit
+ Create a config.js file and add your Twitter auth. credential (click [here](https://apps.twitter.com/) to get them) such as:

```
var Twit = require('twit');

var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

module.exports.T = T
```

## Usage ##
Start the server locally with `npm start`, then navigate to `localhost:8000`.
