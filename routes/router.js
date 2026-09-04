/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   router.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   04.09.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const express = require('express');
const productsRouter = require('./products');

const router = express.Router();

router.use('/products', productsRouter);

module.exports = router;