const express = require("express");
const router = express.Router();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"Invalid Data"
            })
        }
        const{email,password,username} = req.body
        const hashedPassword = await bcrypt.hash(password,10)   //hashing the password
        const newuser = await userModel.create({
            email,
            password : hashedPassword,
            username
        })
        res.json(newuser)
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"Invalid Data",
                status:400
            })
        }
        const {username,password} = req.body
        const hashpass = await bcrypt.hash(password,10)
        const user = await userModel.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }
        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({
                message:"username or password is incorrect"
            })
        }

        // jwt
        const token = jwt.sign({
            user_id:user._id,
            username:user.username  
        },process.env.JWT,
    )

    res.cookie('token',token)
    res.send("Logged In")
        
    }
)

module.exports = router;