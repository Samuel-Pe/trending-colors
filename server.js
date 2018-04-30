var http = require('http'),
fs = require('fs');
var search = require('./search')

function render(path, contentType, fn) {
  fs.readFile(__dirname + '/' + path, 'utf-8', function (err, str) {
    fn(err, str, contentType);
  });
}

function handleRequest (req, res) {
  var httpHandler = function (err, str, contentType) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('An error has occured: ' + err.message);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(str);
    }
  };

  // css and JS regex to check the incoming URL
  var cssRegex = /\.css$/
  var jsRegex = /^\/scripts\//

  var fileName = req.url.slice(1)

  if(cssRegex.test(req.url)) {
    console.log("-- loading css... " + req.url)
    render('views/'+fileName, 'text/css', httpHandler);
  }
  else if(jsRegex.test(req.url)){
    console.log("-- loading script... " + req.url)
    render(fileName, 'application/javascript', httpHandler);
  } else if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    console.log("JSON returning...")
    // basic HTTP header
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // waiting for the methodRouter promise to be fulfilled
    search.methodRouter("basecolors").then(function (fulfilled) {
        console.log(fulfilled)
        // when it's done, sending JSON to client
        res.end(JSON.stringify({ message:fulfilled}))
        console.log("JSON returned!")
    })
  } else {
    console.log("-- loading html... " + req.url)
    render('views/index.html', 'text/html', httpHandler);
  }
}

var app = http.createServer(handleRequest);

app.listen(process.env.port || 8000);
