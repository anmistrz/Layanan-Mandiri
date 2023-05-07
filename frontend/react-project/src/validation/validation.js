import * as Yup from 'yup';


export const USER_VALIDATION = Yup.object().shape({
    address: Yup.string(),
    phone: Yup.number()
        .typeError('That doesn\'t look like a phone number')
        .positive('A phone number can\'t start with a minus')
        .integer('A phone number can\'t include a decimal point')
        .min(10, 'A phone number is at least 10 digits')
        

});

