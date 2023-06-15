const mysql = require('../helpers/database')
const Joi = require('joi')

class _fines {
    // get all fines from one user
    totalMyFines = async (cardnumber) => {
        try {
               
        const schema = Joi.string().required();
      
        const validation = schema.validate(cardnumber)

         if(validation.error){
            const errorDetails = validation.error.details.map(detail => detail.message)
            return {
                status: false,
                code: 400,
                error: errorDetails.join(', ')
            }
         }
        
        BigInt.prototype.toJSON = function() {       
            return this.toString()
        }

        const list = await mysql.query("SELECT (SELECT b.surname FROM koha.borrowers b WHERE b.borrowernumber = a.borrowernumber) AS Patron,IFNULL(format(sum(amountoutstanding),2),0) AS 'Outstanding', (SELECT count(i.itemnumber) FROM koha.issues i WHERE b.borrowernumber = i.borrowernumber ) AS 'Checkouts' FROM koha.accountlines a, koha.borrowers b WHERE a.borrowernumber = b.borrowernumber AND b.cardnumber= ?", 
         [cardnumber])
        
        return {   
            status: true,
            data: list
        }

        } catch (error) {
            console.error('List fines module Error: ', error)
            return {
                status: false,
                error
            }
        }
    }

    listMyFines = async (cardnumber) => {
        try {
            const body = {
                cardnumber
            }

            const schema = Joi.object({
                cardnumber: Joi.string().required(),
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

            BigInt.prototype.toJSON = function() {
                return this.toString()
            }

            const list = await mysql.query("SELECT b2.title, b2.author, bi.publishercode, ac.amountoutstanding from koha.accountlines as ac LEFT JOIN koha.borrowers as b on ac.borrowernumber= b.borrowernumber LEFT JOIN koha.items as i2 on i2.itemnumber= ac.itemnumber LEFT JOIN koha.biblio as b2 on b2.biblionumber=i2.biblionumber LEFT JOIN koha.biblioitems as bi on bi.biblionumber=i2.biblionumber WHERE ac.amountoutstanding > 0 AND b.cardnumber= ?",
            [body.cardnumber]);

            return {
                status: true,
                data: list
            }
        } catch (error){
            console.error("Check List My Fines module Error: ", error)
            return {
                status: false,
                code: 400,
                error
            }
        }
    }


}

module.exports = new _fines()