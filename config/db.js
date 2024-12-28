const mongoose = require("mongoose")

function connectDB() {
    mongoose.connect(process.env.URL_DB).then(()=>{
        console.log("Connected to db")
    })
}