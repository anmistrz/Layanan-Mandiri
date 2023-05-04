const mysql = require('../helpers/database')
const Joi = require('joi')

class _fines {
    // get all fines from one user
    listFines = async (cardnumber) => {
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

        console.log("list", list[0].Patron)        
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
}

module.exports = new _fines()