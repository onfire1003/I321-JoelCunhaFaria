/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   app.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   24.08.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require("express");
const router = require("./routes/router");

const app = express();
const env = require('./config/env');
const PORT = env.port;

app.use(express.json());

app.use("/api", router);

app.get('/', function (req, res) {
    return res.status(200).json({
        message: 'API active'
    });
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
});

module.exports = app;