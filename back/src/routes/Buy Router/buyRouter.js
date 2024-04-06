const { Router } = require("express");
const { addBuy, getBought } = require('../../handlers/buyHandler.js');

const buyRouter = Router();

buyRouter.get('/', getBought);
buyRouter.post('/', addBuy);

module.exports = buyRouter;