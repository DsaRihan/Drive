const mongoose = require("mongoose")
require("dotenv").config()

function connectDB() {
    // mongoose.connect(process.env.URL_DB).then(()=>{
    //     console.log("Connected to db")
    // })
    console.log(process.env.URL_DB)
    mongoose.connect(process.env.URL_DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to the Database Succesfully!")
    }).catch(error=>{
        console.log("Error connecting to DB")
        process.exit(1)
    })
}
module.exports = connectDB;  //export the function to use it in other files