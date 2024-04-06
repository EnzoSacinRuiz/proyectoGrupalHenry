const { Router } = require("express");
const { getUsers, postUser } = require('../../handlers/userHandlers.js');

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/', postUser);

module.exports = userRouter;