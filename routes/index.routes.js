const express = require("express")
const router = express.Router()
const upload = require("../config/multer.config")
const fileModel = require("../models/file.model")
const auth = require("../middleware/auth")
const firebase = require("../config/firebase.config")

router.get('/home',auth,async (req,res)=>{
    const userfiles = await fileModel.find(
        {user : req.user._id}
    );

    res.render('home',{
        userfiles:userfiles
    })
})

router.post('/upload',auth,upload.single('file'),async(req,res)=>{
    const newFile = await fileModel.create({
        path : req.file.path,
        originalname : req.file.originalname,
        user : req.user.userId
    })
    res.json(newFile)
})

router.get("/downloads/:path",auth,async (req,res)=>{
    const id = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user : id,
        path : path
    })

    if(!file){
        return res.status(404).json({message : "File not found"})
    }

    const signurl = await firebase.storage().bucket().file(path).getSignedUrl({
        action : 'read',
        expires : Date.now() + 60*1000
    })
    res.redirect(signurl[0])
})

module.exports = router;