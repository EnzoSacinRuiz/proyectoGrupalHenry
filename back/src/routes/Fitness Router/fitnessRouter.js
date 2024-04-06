const { Router } = require("express");
const { getFitness, addFitness, updateFit } = require('../../handlers/fitnessHandler.js');

const fitnessRouter = Router();

fitnessRouter.get('/', getFitness);
fitnessRouter.post('/', addFitness);
fitnessRouter.put('/', updateFit)

module.exports = fitnessRouter;