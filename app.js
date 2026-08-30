/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   app.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   24.08.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require("express");
const morgan = require('morgan');                       // Importe la libraire de log
/*
const errorHandler = require("./middleware/errorHandler"); // Importe le middleware pour gérer les erreurs
const initDatabase = require("./config/db");           // Importe la fonction pour initialiser la base de données
*/
const app = express();

// Middleware
app.use(morgan('dev'));                                //Active les logs en mode "dev"
app.use(express.json());                               // Permet de lire le corps des requêtes en JSON


// Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });      // Point d'entrée principal qui renvoie un message simple
});


module.exports = app;