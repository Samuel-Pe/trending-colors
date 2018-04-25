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

  if (req.url.indexOf('/scripts/') >= 0) {
    render(req.url.slice(1), 'application/javascript', httpHandler);
  } else if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
    console.log("JSON returning...")
    // basic HTTP header
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // waiting for the methodRouter promise to be fulfilled
    search.methodRouter("basecolors").then(function (fulfilled) {
        console.log("server: fulfilled > " + fulfilled)
        // when it's done, sending JSON to client
        res.end(JSON.stringify({ message:fulfilled}))
    })
    console.log("JSON returned!")

  } else {
    render('views/index.html', 'text/html', httpHandler);
  }
}

var app = http.createServer(handleRequest);

app.listen(process.env.port || 8000);
