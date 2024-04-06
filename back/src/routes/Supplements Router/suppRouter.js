const { Router } = require("express");
const { addSupp, getSupps, deleteSupp, updateSupp, getSuppsByID} = require('../../handlers/suppHandler.js');

const suppRouter = Router();

suppRouter.get('/', getSupps);
suppRouter.post('/', addSupp);
suppRouter.delete('/', deleteSupp);
suppRouter.put('/:ID', updateSupp)
suppRouter.get('/:ID', getSuppsByID);

module.exports = suppRouter;