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
  getAllUserEntries: prep("SELECT * FROM public.entries WHERE user_id = ${userID} ORDER BY entry_id ASC"),
  postEntry: prep("INSERT INTO public.entries(user_id, text, date) VALUES (${userID}, ${text}, ${date})"),
  getEntriesBetweenDates: prep("SELECT * FROM public.entries WHERE user_id = ${userID} AND date BETWEEN ${startDate} AND ${endDate}"),
  getEntryByDate: prep("SELECT * FROM public.entries WHERE  user_id = ${userID} AND date = ${date}"),
  deleteEntryByDate: prep("DELETE FROM public.entries WHERE user_id = ${userID} AND date = ${date}")
};

const postEntry = (request, response) => {
  const insertion = {
    text: request.body.text,
    date: request.body.date,
    userID: request.body.userID
  };
  pool.query(queries.postEntry(insertion), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getAllUserEntries = (request, response) => {
  pool.query(queries.getAllUserEntries({userID: request.body.userID}), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEntryByDate = (request, response) => {
  const insertion = {
    date: request.body.date,
    userID: request.body.userID
  };
  pool.query(queries.getEntryByDate(insertion), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getEntriesBetweenDates = (request, response) => {
  const insertion = {
    startDate: request.body.startDate,
    endDate: request.body.endDate,
    userID: request.body.userID
  };
  pool.query(queries.getEntriesBetweenDates(insertion), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const deleteEntryByDate = (request, response) => {
  const insertion = {
    date: request.body.date,
    userID: request.body.userID
  };
  pool.query(queries.deleteEntryByDate(insertion), (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

module.exports = {
  getAllUserEntries,
  postEntry,
  getEntryByDate,
  getEntriesBetweenDates,
  deleteEntryByDate
};