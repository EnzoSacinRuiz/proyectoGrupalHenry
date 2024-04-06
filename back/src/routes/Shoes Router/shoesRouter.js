const { Router } = require("express");
const { getShoes, addShoe, updateShoe } = require('../../handlers/shoeHandler.js');

const shoesRouter = Router();

shoesRouter.get('/', getShoes);
shoesRouter.post('/', addShoe);
shoesRouter.put('/', updateShoe)

module.exports = shoesRouter;