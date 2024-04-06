const { Router } = require("express");
const { postPago } = require("../../handlers/mercadoPagoHandler");


const mercadoPagoRouter = Router();

mercadoPagoRouter.post('/create_preference',postPago)



module.exports = mercadoPagoRouter;
