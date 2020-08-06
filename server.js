const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

//const hubsRouter = require('./hubs/hubs-router.js');
const apiRouter = require('./api/router');

const server = express();

//Global middleware
server.use(express.json()); //built-in middleware, no need to npm install

server.use(morgan('dev')); 
//gives you info in your terminal about how long the request is taking and how  many characters its generating when you make the request. could be helpful to know if your server is taking a lot longer to complete the request during certain times of day, you will know you are busy during that time and may need to run an additional server

server.use(helmet()); //free extra security. Always use it.

server.use(logger);

server.post("/login", (req, res) => {
  const creds = req.body;

  //validate checking against the database
  res.status(200).json({ token: "allgood" });
});

server.use('/api', checkPass("mellon"), apiRouter);
//server.use('/api/hubs', hubsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ hello: req.name });
});

// req, res and next are the "three amigas"
function logger(req, res, next) {
  const name = req.headers.name;
  
  req.name = name;
  
  console.log(`${req.name} made a ${req.method} request to ${req.url}`);
  
  next();
}

function checkPass(password) {
  return function (req, res, next) {
      // check the password
      if(req.headers.authorization === password) {
        next()
      } else {
        res.status(401).json({ you: "cannot pass"})
      }
  };
}

module.exports = server;
