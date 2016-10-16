var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var toDoRouter = require('./routes/toDoList');

// middleware running
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// routers running
app.use('/toDoList', toDoRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
