const { Router } = require("express");
const { addCarrito, getCarrito, deleteCarrito } = require('../../handlers/carritoHandler.js');

const carritoRouter = Router();

carritoRouter.post('/', addCarrito);
carritoRouter.get('/',  getCarrito);
carritoRouter.delete('/', deleteCarrito);

module.exports = carritoRouter;