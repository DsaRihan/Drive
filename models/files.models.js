const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : [true,'path is required']
    },
    originalName : {
        type : String,
        required : [true,'name is required']
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true,'user is required']
    }
})

const File = mongoose.model('file',fileSchema);
module.exports = File;