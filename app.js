var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function() {
    next();
  });
});
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api', function (req, res) {
    var text = req.rawBody;
    res.send(text);
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log("Node app is running on port:" + app.get('port'));
});