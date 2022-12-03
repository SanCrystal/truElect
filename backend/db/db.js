/**
 * create database and connect 
 */
//require mongoose 
const mongoose = require('mongoose');
require('dotenv').config()

//require connection string
const connectionString = process.env.MONGO_URL
    // const connectionString = process.env.URL


module.exports.db = () => {

    mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(success => console.log("database connected")).catch(error => console.log(error))

}

