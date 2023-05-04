const { Router } = require('express');
const response = require('../helpers/response');
const m$auth = require('../modules/auth.modules');

const AuthController = Router();


AuthController.post('/', async (req, res, next) => {
    const login = await m$auth.login(req.body)
    response.sendResponse(res, login)
})

AuthController.post('/index', async (req, res, next) => {
    response.sendResponse(res, await m$auth.indexLogin(req.body))
})

AuthController.post('/admin', async (req, res, next) => {
    response.sendResponse(res, await m$auth.adminLogin(req.body))
})

AuthController.post('/logout', async (req, res, next) => {
    response.sendResponse(res, await m$auth.logout(req.body))
})


module.exports = AuthController;