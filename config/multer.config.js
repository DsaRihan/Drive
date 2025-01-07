const multer = require('multer');
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase");
const serviceacc = require("../drive-c91ad-firebase-adminsdk-lez4u-e3b20ea7b5.json");
const { credential } = require('firebase-admin');

const storage = firebaseStorage({
    credentials : firebase.credential.cert(serviceacc),
    bucketName : 'drive-c91ad.appspot.com',
    unique:true
})

const upload = multer({
    storage: storage
})

module.exports = upload;