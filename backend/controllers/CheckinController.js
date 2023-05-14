const {Router} = require('express')
const m$checkin = require('../modules/checkin.modules')
const response = require('../helpers/response')
const {userSession, verifyAdmin, adminSession} = require('../helpers/middleware')

const CheckinController = Router()

CheckinController.post('/user/add', userSession, async (req, res, next) => {
    response.sendResponse(res, await m$checkin.checkinPending(req.user.cardnumber, req.body))
})

CheckinController.get('/user/list', userSession, async (req, res, next) => {
    response.sendResponse(res, await m$checkin.listMyChekin(req.user.cardnumber))
})

CheckinController.get('/admin/list', adminSession, verifyAdmin, async (req, res, next) => {
    response.sendResponse(res, await m$checkin.listPending(req.user.userid))
})


module.exports = CheckinController;