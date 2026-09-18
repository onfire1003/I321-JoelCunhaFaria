const express = require('express');
const { body, param } = require('express-validator');
const pizzaIngredientsController = require('../controllers/pizzaIngredientsController');

const router = express.Router();
const idValidation = (name) => param(name).isInt({ gt: 0 }).withMessage(`${name} must be a positive integer`);

/**
 * @openapi
 * /api/v1/pizza-ingredients:
 *   post:
 *     summary: Associate an ingredient with a pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pizzaId, ingredientId]
 *             properties:
 *               pizzaId:
 *                 type: integer
 *                 example: 1
 *               ingredientId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Association created
 *       404:
 *         description: Pizza or ingredient not found
 *       409:
 *         description: Association already exists
 */
router.post(
    '/',
    [
        body('pizzaId').isInt({ gt: 0 }).withMessage('pizzaId must be a positive integer'),
        body('ingredientId').isInt({ gt: 0 }).withMessage('ingredientId must be a positive integer')
    ],
    pizzaIngredientsController.create
);

/**
 * @openapi
 * /api/v1/pizza-ingredients/pizza/{pizzaId}:
 *   get:
 *     summary: Retrieve the ingredients of a pizza
 *     parameters:
 *       - in: path
 *         name: pizzaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingredients of the pizza
 *       404:
 *         description: Pizza not found
 */
router.get('/pizza/:pizzaId', [idValidation('pizzaId')], pizzaIngredientsController.findIngredientsByPizza);

/**
 * @openapi
 * /api/v1/pizza-ingredients/ingredient/{ingredientId}:
 *   get:
 *     summary: Retrieve the pizzas containing an ingredient
 *     parameters:
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pizzas containing the ingredient
 *       404:
 *         description: Ingredient not found
 */
router.get('/ingredient/:ingredientId', [idValidation('ingredientId')], pizzaIngredientsController.findPizzasByIngredient);

/**
 * @openapi
 * /api/v1/pizza-ingredients/{pizzaId}/{ingredientId}:
 *   delete:
 *     summary: Remove an ingredient from a pizza
 *     parameters:
 *       - in: path
 *         name: pizzaId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: ingredientId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Association removed
 *       404:
 *         description: Association not found
 */
router.delete(
    '/:pizzaId/:ingredientId',
    [idValidation('pizzaId'), idValidation('ingredientId')],
    pizzaIngredientsController.delete
);

module.exports = router;
