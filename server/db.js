const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  pssword: "Poochies8",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});