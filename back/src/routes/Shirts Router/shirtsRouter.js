const { Router } = require("express");
const { getShirts, addShirt, updateShirt } = require('../../handlers/shirtHandler.js');

const shirtsRouter = Router();

shirtsRouter.get('/', getShirts);
shirtsRouter.post('/', addShirt);
shirtsRouter.put('/', updateShirt)

module.exports = shirtsRouter;