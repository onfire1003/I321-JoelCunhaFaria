/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   server.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   24.08.2026
-----------------------------------------------------------------------------------------------------------------------
*/
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});