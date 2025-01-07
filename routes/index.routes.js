const express = require("express")
const router = express.Router()
const upload = require("../config/multer.config")
const fileModel = require("../models/file.model")
const auth = require("../middleware/auth")

router.get('/home',auth,async (req,res)=>{
    const userfiles = await fileModel.find(
        {user : req.user._id}
    );
    res.render('home')
})

router.post('/upload',auth,upload.single('file'),async(req,res)=>{
    const newFile = await fileModel.create({
        path : req.file.path,
        originalname : req.file.originalname,
        user : req.user.userId
    })
    res.json(newFile)
})



module.exports = router;