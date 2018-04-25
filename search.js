// importing twit package (node.js twitter API)
var Twit = require('twit');
var config = require("./config")
// importing file system package

/* ------------ SETUP ------------ */

// id = country, count = bullshit, doesn't seem to chance anything :(
var params = { id: 1 }

/* ------------ FUNCTIONS ------------ */
function searchedData(err, data, response) {
  // this function is empty because we use promises
  // console.log("callback")
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

// getting hexadecimal value and displays it as it is (no graphical change whatsoever)
function baseColors(trends) {
  var stringRes = "["

  for(i = 0, len = trends.length; i < len ; i++) {
    var name = trends[i].name
    // converting it to hexadecimal and removing the hastag
    var hexname = name.hexEncode()
    var colorValue = hexname.substring(0,6);

    stringRes += '{"hexvalue": "'
    stringRes += colorValue

    // ommit coma if last item
    if(i == len-1) {
      stringRes += '"}'
    } else {
      stringRes += '"},'
    }
  }
  stringRes += "]"

  return stringRes
}

function methodRouter(method) {
    return new Promise((resolve,reject) => {
      // waiting for the Twit API call (returns a promise)
      dataPromise = config.T.get('trends/place', params, searchedData);
      dataPromise
        // if it's a success, let's go
        .then(function(fulfilled) {
          // getting the specific data back
          trends = fulfilled.data[0].trends

          // method router itself
          if(method == "basecolors") {
            stringRes = baseColors(trends)
          }

          // returns the result of secondPromise(resultOfFirstPromise)
          resolve(stringRes)
        })
        // not a success, unlucky team.
        .catch(function(error) {
          console.log("error :( ")
          reject(error)
        })
    })
}

module.exports.methodRouter = methodRouter
