require('dotenv').config()

module.exports = {
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: Number(process.env.JWT_EXPIRES_IN)
    },
    jwtIndex: {
        secret: process.env.JWT_SECRET_INDEX,
        expiresIn: Number(process.env.JWT_EXPIRES_IN_INDEX)
    },
}



// {
//     "db": {
//         "host": "103.226.174.227",
//         "port": 3360,
//         "user": "scholarship",
//         "password": "scholarship123",
//         "database": "koha"
//     },
//     "jwt": {
//         "secret": "secret-key-jwt",
//         "expiresIn": 1800000
//     },
//     "jwtIndex": {
//         "secret": "secret-key-jwt",
//         "expiresIn": 43200000
//     }
// }
