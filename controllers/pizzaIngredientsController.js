const { validationResult } = require('express-validator');
const Pizza = require('../models/pizza');
const Ingredient = require('../models/ingredient');
const PizzaIngredient = require('../models/pizzaIngredient');

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pizzaId, ingredientId } = req.body;
        const [pizza, ingredient] = await Promise.all([
            Pizza.findById(pizzaId),
            Ingredient.findById(ingredientId)
        ]);

        if (!pizza || !ingredient) {
            return res.status(404).json({
                error: !pizza ? 'Pizza not found' : 'Ingredient not found'
            });
        }

        const association = await PizzaIngredient.create({ pizzaId, ingredientId });
        return res.status(201).json(association);
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).json({ error: 'This association already exists' });
        }
        next(err);
    }
};

exports.findIngredientsByPizza = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const pizzaId = Number(req.params.pizzaId);
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) return res.status(404).json({ error: 'Pizza not found' });

        const ingredients = await PizzaIngredient.findByPizzaId(pizzaId);
        return res.status(200).json(ingredients);
    } catch (err) {
        next(err);
    }
};

exports.findPizzasByIngredient = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const ingredientId = Number(req.params.ingredientId);
        const ingredient = await Ingredient.findById(ingredientId);
        if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });

        const pizzas = await PizzaIngredient.findByIngredientId(ingredientId);
        return res.status(200).json(pizzas);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const pizzaId = Number(req.params.pizzaId);
        const ingredientId = Number(req.params.ingredientId);
        const deleted = await PizzaIngredient.delete({ pizzaId, ingredientId });

        if (deleted === 0) {
            return res.status(404).json({ error: 'Pizza-ingredient association not found' });
        }

        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
