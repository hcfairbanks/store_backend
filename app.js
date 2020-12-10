import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
var cors = require('cors')
let app = express();

// Allow cors for local testing
// Uncoment this as needed
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

const db = require("./models");

// db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});