// https://www.youtube.com/watch?v=pkh3J3u-jN4


const path = require("path");
const bunyan = require("bunyan");
const Mask = require("./mask");
// favour using env variables to provide your code with external configs
// it makes it a lot simpler when you want to change the configs
const level = process.env.NODE_LOGGING_LEVEL || "info";

const log = bunyan.createLogger({
  name: "myapp",
  streams: [
    {
      level,
      stream: process.stdout
    },
    {
      level,
      path: path.resolve(__dirname, "..", "..", "logs.json")
    }
  ]
});

module.exports = new Mask(log);

// const winston = require('winston');
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console()
//     ]
// });


// export default logger