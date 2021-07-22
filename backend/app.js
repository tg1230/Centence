const express = require("express");
const cors = require('cors');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const db = require('./queries');

var app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`)
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/getAllUserEntries', db.getAllUserEntries);

app.post('/postEntry', db.postEntry);

app.get('/getEntryByDate', db.getEntryByDate);

app.get('/getEntriesBetweenDates', db.getEntriesBetweenDates);

app.delete('/deleteEntryByDate', db.deleteEntryByDate);

app.post('/register', (request, response) => {

})