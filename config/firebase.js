const Firebase = require("firebase-admin");
const serviceacc = require("../drive-c91ad-firebase-adminsdk-lez4u-e3b20ea7b5.json")

const firebase = Firebase.initializeApp({
    credential : Firebase.credential.cert(serviceacc),
    storageBucket : "drive-c91ad.appspot.com"
})

module.exports = Firebase;