### Twitter colors v0.1 ###

## Set up ##
+ Install [npm](https://www.npmjs.com/) and [Node.js](https://nodejs.org/)
+ Install twit (Twitter API with Node.js):
```
npm install twit
```
+ In the root directory, create a config.js file
+ Add your Twitter auth. credential (click [here](https://apps.twitter.com/) to get them, create a new app if needed) such as:
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

## Change location ##
By default, the trending topics' location is France, but you can change the ID value in `search.js`:
```
var params = { id: 23424819, count: 10 }
```

## Credits ##
This project has been developed by [Samuel Pélissier](https://twitter.com/sampelissier), with the useful help of [David Boulle](http://www.davidboulle.fr/).
