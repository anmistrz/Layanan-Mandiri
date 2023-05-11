import * as Yup from 'yup';


export const USER_VALIDATION = Yup.object().shape({
    address: Yup.string(),
    phone: Yup.number()
        .typeError('Harus berupa angka')
        .positive('Nomoer telepon tidak boleh negatif')
        .integer('Nomor telepon tidak boleh desimal')

        

});

