import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
var cors = require('cors')
let app = express();

// Allow cors for local testing
// Uncomment this as needed
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

const db = require("./models");

const dotenv = require("dotenv");

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;


// db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// Confirm this section is working any more
// app.listen(3000, function () {
//     console.log('Example app listening on port 3000!')
// });
// module.exports = app;


const port = 3000
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = server;