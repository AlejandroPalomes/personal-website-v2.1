const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const con = require('./config/db-connect.js');
// import {config} from './config/app-config.js';
const projects = require('./routes/api/projects')

const app = express();

//Middleware
// app.use((req, res, next) => {
//     req.con = con;
//     next();
// });

app.use(parser.json());
app.use(cors());

app.use('/api/projects', projects);

//Handdle Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(__dirname + "/public/"));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 8000;
// const port = 8000;

app.listen(port, ()=> console.log(`Server running on port ${port}.`));