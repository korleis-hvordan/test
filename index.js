const express = require('express');
const helmet = require('helmet');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.post('/test', function(req, res) {
  console.log(req.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);