/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   db.sql
author              :   Joel Cunha Faria
creation date       :   28.08.2026
modification date   :   28.08.2026
-----------------------------------------------------------------------------------------------------------------------
*/

DROP
    DATABASE IF EXISTS products-api;

CREATE
    DATABASE products-api;

USE
    products-api;

DROP TABLE IF EXISTS products;

DROP TABLE IF EXISTS ingredients;

-- -----------------------------------------------------
-- Tables principales
-- -----------------------------------------------------
