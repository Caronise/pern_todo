const express = require("express");
const app = express();
const nodemon = require('nodemon');
const cors = require("cors");
const pool = require("./db");

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
  const PORT = 5000;

// Middle ware
app.use(cors());
app.use(express.json());

// Message to verify proper connection
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`)
});

//// ROUTES

// Create a todo
app.post("/todos", async(req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description) VALUES($1)", 
      [description]
    );
    res.json(newTodo);

  } catch (err) {
    console.error(err.message);
  }
});
