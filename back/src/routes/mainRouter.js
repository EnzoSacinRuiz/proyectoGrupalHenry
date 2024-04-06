const { Router } = require("express");
const userRouter = require('./User Router/userRouter.js');
const activityRouter = require('./Activity Router/activityRouter.js');
const buyRouter = require('./Buy Router/buyRouter.js')
const suppRouter = require('./Supplements Router/suppRouter.js');
const shoesRouter = require('./Shoes Router/shoesRouter.js');
const shirtsRouter = require('./Shirts Router/shirtsRouter.js');
const fitnessRouter = require('./Fitness Router/fitnessRouter.js');
const mercadoPagoRouter = require("./MercadoPago Router/mercadoPagoRouter.js");
const carritoRouter = require("./Carrito Router/carritoRouter.js");
const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/activity', activityRouter);
mainRouter.use('/buy', buyRouter);
mainRouter.use('/supps', suppRouter);
mainRouter.use('/zapatos', shoesRouter);
mainRouter.use('/remeras', shirtsRouter);
mainRouter.use('/fitness', fitnessRouter);
mainRouter.use('/carrito', carritoRouter);
mainRouter.use('/', mercadoPagoRouter);
mainRouter.use('/hola', (req, res) => res.status(200).json( { mensaje: 'Esta es una función de prueba' } ) );




module.exports = mainRouter;
