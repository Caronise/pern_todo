const express = require("express");
const app = express();
const nodemon = require('nodemon');
const cors = require("cors");

// This is a solution to nodemon not properly killing the child process and keeping ports occupied.
process
  .on('exit', (code) => { // Handle normal exits
    nodemon.emit('quit');
    process.exit(code);
  })
  
  .on('SIGINT', () => {   // Handle CTRL+C
    nodemon.emit('quit');
    process.exit(0);
  });
  
// If required, change the port below
  const PORT = 5001;

// Middle ware
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`)
})