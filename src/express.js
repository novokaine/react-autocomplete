var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const data = require('./data/countries');
const cors = require('cors');
const port = 3500;

express()
	.use(cors())
	.use(express.static(__dirname + '/data'))
	.get('/', function (req, res) {
		res.send(data);
	})
	.listen(port);

console.log(`Application is running on port  ${port}`)