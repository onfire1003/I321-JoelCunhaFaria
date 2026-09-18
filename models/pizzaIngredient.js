/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   pizzaIngredient.js
author              :   Joel Cunha Faria
creation date       :   24.08.2026
modification date   :   11.09.2026
-----------------------------------------------------------------------------------------------------------------------
*/
const db = require('../config/database');

class PizzaIngredient {
    /**
     * Associate an existing ingredient with an existing pizza.
     * The composite primary key prevents the same association from being added twice.
     */
    static create({ pizzaId, ingredientId }) {
        const sql = `INSERT INTO pizza_ingredients (pizza_id, ingredient_id)
                     VALUES (?, ?)`;

        return new Promise((resolve, reject) => {
            db.run(sql, [pizzaId, ingredientId], function (err) {
                if (err) return reject(err);
                resolve({ pizza_id: pizzaId, ingredient_id: ingredientId });
            });
        });
    }

    static findByPizzaId(pizzaId) {
        const sql = `
            SELECT ingredients.*
            FROM ingredients
            INNER JOIN pizza_ingredients
                ON pizza_ingredients.ingredient_id = ingredients.id
            WHERE pizza_ingredients.pizza_id = ?
            ORDER BY ingredients.id DESC
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [pizzaId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static findByIngredientId(ingredientId) {
        const sql = `
            SELECT pizzas.*
            FROM pizzas
            INNER JOIN pizza_ingredients
                ON pizza_ingredients.pizza_id = pizzas.id
            WHERE pizza_ingredients.ingredient_id = ?
            ORDER BY pizzas.id DESC
        `;

        return new Promise((resolve, reject) => {
            db.all(sql, [ingredientId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    /** Remove one pizza/ingredient association. Returns the number of removed rows. */
    static delete({ pizzaId, ingredientId }) {
        const sql = `DELETE FROM pizza_ingredients
                     WHERE pizza_id = ? AND ingredient_id = ?`;

        return new Promise((resolve, reject) => {
            db.run(sql, [pizzaId, ingredientId], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = PizzaIngredient;
