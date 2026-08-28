/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   router.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   24.08.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "API fonctionnelle"
    });
});

module.exports = router;