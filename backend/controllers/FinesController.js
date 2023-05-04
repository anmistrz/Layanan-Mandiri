const { Router } = require('express');
const m$fines = require('../modules/fines.modules');
const response = require('../helpers/response');
const { userSession } = require('../helpers/middleware');

const FinesController = Router();

/**
 * Get all fines in one User
 * @param {string} cardnumber
*/


FinesController.get('/',userSession, async (req, res, next) => {
    const fines = await m$fines.listFines(req.user.cardnumber)
    response.sendResponse(res, fines)
})


module.exports = FinesController;

