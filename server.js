require('./api/config/env');
const https = require("https");
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
var cors = require('cors')

global.APP_PATH = path.resolve(__dirname);
global.LOG_FILE = path.resolve(__dirname);

const errorHandler = require('./api/errors/handler');

if (process.argv.indexOf('--seed') !== -1) {
  require('./api/config/seed');
}

const app = express();

app.use(cors());

require('./api/config/db');

app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Configuring CORS


// Configuring Routes
app.get('/', (req, res) => {
  const marked = require('marked');
  const filepath = `${__dirname}/README.md`;
  const file = fs.readFileSync(filepath, 'utf8');
  res.send(marked(file.toString()));
});

app.use('/api/v1/', require('./api/routes')());

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => console.log(`99Gens Back-End listening on port! ${PORT}`));


// https.createServer(options, app)
// .listen(3000, function (req, res) {
//   console.log("Server started at port 3000");
// });

// const options = {
//   cert: fs.readFileSync('./localhost.crt'),
//   key: fs.readFileSync('./localhost.key'),
// };


// https.createServer(options, app).listen(8080);
// console.log("Server listening on https://localhost:8080/");


// process.on('uncaughtException', (err) => {
//   /* eslint no-console: 0 */
//   console.error(err.stack, 'err.stack');
// });

module.exports = app; 
