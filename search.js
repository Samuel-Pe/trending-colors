// importing twit package (node.js twitter API)
var Twit = require('twit');
var config = require("./config")
// importing file system package

/* ------------ SETUP ------------ */

// id = country, count = bullshit, doesn't seem to chance anything :(
var params = { id: 23424819, count: 10 }

/* ------------ FUNCTIONS ------------ */
function searchedData(err, data, response) {
  var trends = data[0].trends
  var stringRes = "["

  for(i = 0, len = trends.length; i < len ; i++) {
    var name = trends[i].name
    // converting it to hexadecimal and removing the hastag
    var hexname = name.hexEncode()
    var colorValue = hexname.substring(0,6);

    stringRes += '{"hexvalue": "'
    stringRes += colorValue

    // omit coma if last item
    if(i == len-1) {
      stringRes += '"}'
    } else {
      stringRes += '"},'
    }
  }
  stringRes += "]"
  console.log(stringRes)

  module.exports.stringRes = stringRes
}

// converts a string to hexadecimal + removes the potential # at the beginning
String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        if(hex != 23) {
          result += (hex).slice(-4);
        }
    }
    return result
}

// getting the data + callback function
var getData = config.T.get('trends/place', params, searchedData);

module.exports.getData = getData;
