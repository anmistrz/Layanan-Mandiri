const mysql = require('../helpers/database')
const jwt = require('jsonwebtoken')
const config = require('../config/app.config.json')
const date = require('date-and-time')
const Joi = require('joi')
const Bcrypt = require('bcrypt')
const { userInfo } = require('os')

class _auth {

    logout = async (body) => {
        try {
            const schema = Joi.object({
                password: Joi.string().required(),
                userid: Joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const checkUser = await mysql.query('SELECT p.password FROM koha.borrowers p WHERE p.userid = ?', [body.userid])

            const checkPassword = Bcrypt.compareSync(
                body.password,
                checkUser[0].password
            )

            if(!checkPassword) {
                return {
                    status: false,
                    code: 404,
                    data: {
                        password: checkUser[0].password
                    },
                    error: 'Password not match'
                }
            }

            return {
                status: true,
                data: {
                    message: 'Logout success'
                }
            }
        } catch (error) {
            console.error('Logout auth module Error: ', error)
            return {
                status: false,
                data: {
                    message: 'Logout failed'
                },
                error
            }
        }

    }

    login = async (body) => {
        try {
           
            const schema = Joi.object({
                cardnumber: Joi.string().required()
            })

            const validation = schema.validate(body)


            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const checkUser = await mysql.query('SELECT p.cardnumber, p.categorycode ,p.surname, p.dateexpiry FROM koha.borrowers p WHERE p.cardnumber = ?', [body.cardnumber])

            if(checkUser.length == 0) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }


            const { secret, expiresIn } = config.jwt

            const payload = {
                cardnumber: checkUser[0].cardnumber,
                categorycode: checkUser[0].categorycode,
                surname: checkUser[0].surname,
                dateexpiry: checkUser[0].dateexpiry,
                duration: expiresIn
            }


            const token = jwt.sign(payload, secret, { expiresIn: String(expiresIn) })
            const expiresAt = date.format(new Date(Date.now() + expiresIn), 'YYYY-MM-DD HH:mm:ss')

            return {
                status: true,
                data: {
                    token,
                    expiresAt
                }
            }
        } catch (error) {
            console.error('Login auth module Error: ', error)
            return {
                status: false,
                error
            }
        }
    }

    indexLogin = async (body) => {
        try {
           
            const schema = Joi.object({
                userid: Joi.string().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const checkUser = await mysql.query('SELECT p.userid, p.password ,p.surname, p.dateexpiry FROM koha.borrowers p WHERE p.userid = ?', [body.userid])

            const checkPassword = Bcrypt.compareSync(
                body.password,
                checkUser[0].password
            )

            if(!checkPassword) {
                return {
                    status: false,
                    code: 404,
                    error: 'Password not match'
                }
            }

            if(checkUser[0].userid != body.userid) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            const payload = {
                cardnumber: checkUser[0].cardnumber,
                userid: checkUser[0].userid,
                password: checkUser[0].password,
                categorycode: checkUser[0].categorycode,
            }

            const { secret, expiresIn } = config.jwtIndex

            const token = jwt.sign(payload, secret, { expiresIn: String(expiresIn) })
            const expiresAt = date.format(new Date(Date.now() + expiresIn), 'YYYY-MM-DD HH:mm:ss')
            
            return {
                status: true,
                code: 200,
                data : {
                    token,
                    expiresAt
                },
                message: 'Login success'
            }

        } catch (error) {
            console.error('Login auth module Error: ', error)
            return {
                status: false,
                error
            }
        }
    }
    
    adminLogin = async (body) => {
        try {
           
            const schema = Joi.object({
                userid: Joi.string().required(),
                password: Joi.string().required()
            })

            const validation = schema.validate(body)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const checkUser = await mysql.query('SELECT p.userid, p.password ,p.surname, p.dateexpiry FROM koha.borrowers p WHERE p.userid = ?', [body.userid])

            const checkPassword = Bcrypt.compareSync(
                body.password,
                checkUser[0].password
            )

            if(!checkPassword) {
                return {
                    status: false,
                    code: 404,
                    error: 'Password not match'
                }
            }

            if(checkUser[0].userid != body.userid) {
                return {
                    status: false,
                    code: 404,
                    error: 'User not found'
                }
            }

            const payload = {
                cardnumber: checkUser[0].cardnumber,
                userid: checkUser[0].userid,
                password: checkUser[0].password,
                categorycode: checkUser[0].categorycode,

            }

            const { secret, expiresIn } = config.jwt

            const token = jwt.sign(payload, secret, { expiresIn: String(expiresIn) })
            const expiresAt = date.format(new Date(Date.now() + expiresIn), 'YYYY-MM-DD HH:mm:ss')

            
            return {
                status: true,
                code: 200,
                data: {
                    token,
                    expiresAt
                },
                message: 'Login admin success'
            }

        } catch (error) {
            console.error('Login auth module Error: ', error)
            return {
                status: false,
                error
            }
        }
    } 
}

module.exports = new _auth()
