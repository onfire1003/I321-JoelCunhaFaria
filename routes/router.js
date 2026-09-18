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
const ingredientsRouter = require('./ingredients')

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);

module.exports = router;