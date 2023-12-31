const midtransClient = require('midtrans-client');
const path = require('path');
require('dotenv').config();
module.exports = {
    // Create Core API instance
    snap: new midtransClient.Snap({
        isProduction : false,
        serverKey : process.env.SERVER_KEY_SANDBOX,
        clientKey : process.env.CLIENT_KEY_SANDBOX
    })
}