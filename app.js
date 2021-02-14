import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';

// Allow cors for local testing
// Uncomment this as needed
const cors = require('cors');
const dotenv = require('dotenv');

const port = 3000;

const app = express();

// Allow cors for local testing
// Uncomment this as needed
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

dotenv.config();

const server = app.listen(port);

module.exports = server;
