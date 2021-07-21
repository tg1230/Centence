const dotenv = require("dotenv");
dotenv.config();
const buf = Buffer.from("BASIC=basic");
const config = dotenv.parse(buf); // will return an object
console.log(typeof config, config); // object { BASIC : 'basic' }
const Pool = require("pg").Pool;
const prep = require("pg-prepared");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: 5432,
});

const queries = {
  getAll: prep("SELECT * FROM public.entries ORDER BY id ASC"),
};

const getAllEntries = (request, response) => {
  pool.query(queries.getAll(), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getAllEntries
};