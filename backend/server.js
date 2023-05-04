var mysql = require('mysql');

// setup your databse (username & password & databasename)
var connection = mysql.createConnection({
    host: "103.226.174.227",
    port: 3306,
    user: "scholarship",
    password: "scholarship123",
    database: "koha"
});

// check your database connection
connection.connect(function(err) {

    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});