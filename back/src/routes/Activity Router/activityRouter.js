const { Router } = require("express");
const { getActivity, postActivity } = require('../../handlers/activityHandlers.js');

const activityRouter = Router();

activityRouter.get('/', getActivity);
activityRouter.post('/', postActivity);

module.exports = activityRouter;
