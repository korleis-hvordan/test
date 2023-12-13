const express = require('express');
const helmet = require('helmet');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', parameterLimit: 100000, extended: true }));

app.use(express.json());
app.use(express.urlencoded());

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function(req, res) {
  res.send('test');
});

app.post('/', function(req, res) {
  console.log(req.body);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);