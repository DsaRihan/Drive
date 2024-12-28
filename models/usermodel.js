const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minlenght:[3,'minimum 3 characters'],
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlenght:[13,'minimum 13 characters'],
    },
})

const user = mongoose.model('user',userSchema);
module.exports = user;  //exporting the model