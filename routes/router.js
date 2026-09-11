/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   router.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   04.09.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require('express');
const pizzasRouter = require('./pizzas');

const router = express.Router();

router.use('/pizzas', pizzasRouter);

module.exports = router;