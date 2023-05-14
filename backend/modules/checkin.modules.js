const mysql = require('../helpers/database')
const Joi = require('joi')

class _checkin {
    
    // checkin a book in issues_pending table who have need to be checkin by admin
    checkinPending = async (cardnumber, body) => {
        try {
            body = {
                cardnumber,
                ...body
            }

            const schema = Joi.object({
                cardnumber: Joi.string().required(),
                barcode: Joi.string().required()
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
            

            const list = await mysql.query("SELECT b.borrowernumber, i.issue_id ,i.itemnumber, i.date_due, i.branchcode, i.lastreneweddate ,i.renewals, i.auto_renew, i.issuedate, i.onsite_checkout FROM koha.borrowers b LEFT JOIN koha.issues i ON i.borrowernumber = b.borrowernumber LEFT JOIN koha.items i2 ON i2.itemnumber = i.itemnumber WHERE i.branchcode= 'PUSAT' AND b.cardnumber = ? AND i2.barcode = ?",
            [body.cardnumber, body.barcode]);

            const addPending = await mysql.query("INSERT INTO koha.issues_pending (borrowernumber, itemnumber, date_due, branchcode, returndate, lastreneweddate ,renewals, auto_renew, issuedate, onsite_checkout, status) VALUES (? , ?, ?, ?, ?, now(), ?, ?, ?, ?, ?, 'CHECKIN PENDING')",
            [list[0].issue_id,list[0].borrowernumber, list[0].itemnumber, list[0].date_due, list[0].branchcode, list[0].lastreneweddate, list[0].renewals, list[0].auto_renew, list[0].date_due, list[0].onsite_checkout]);

            return {
                status: true,
                data: addPending
            }

        }catch (error){
            console.error("Checkin Pending module Error: ", error)
            return {
                status: false,
                error
            }
        }
    }

    // list all pending checkin can be accessed by admin
    listPending = async (userid) => {
        try {

            const schema = Joi.string().required()

            const validation = schema.validate(userid)
            console.log("user admin", userid)
            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const list = await mysql.query("SELECT b.surname, b1.title, i.renewals, i.returndate, i.status FROM koha.borrowers b LEFT JOIN koha.issues_pending i ON i.borrowernumber = b.borrowernumber LEFT JOIN koha.items i2 ON i2.itemnumber = i.itemnumber LEFT JOIN koha.biblio b1 ON b1.biblionumber = i2.biblionumber WHERE i.status = 'CHECKIN PENDING';")

            return {
                status: true,
                data: list
            }

        }catch (error){
            console.error("List Pending module Error: ", error)
            return {
                status: false,
                error
            }
        }
    }

    listMyChekin = async (cardnumber) => {
        try {

            const schema = Joi.string().required()

            const validation = schema.validate(cardnumber)

            if(validation.error){
                const errorDetails = validation.error.details.map(detail => detail.message)
                return {
                    status: false,
                    code: 400,
                    error: errorDetails.join(', ')
                }
            }

            const list = await mysql.query("SELECT b.surname, b1.title, i.renewals, i.returndate FROM koha.borrowers b LEFT JOIN koha.old_issues i ON i.borrowernumber = b.borrowernumber LEFT JOIN koha.items i2 ON i2.itemnumber = i.itemnumber LEFT JOIN koha.biblio b1 ON b1.biblionumber = i2.biblionumber WHERE  b.cardnumber = ?;",
            [cardnumber])

            return {
                status: true,
                data: list
            }

        }catch (error){
            console.error("List Pending module Error: ", error)
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _checkin()