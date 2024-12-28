const express = require("express");
const userRoute = require("./routes/user.routes")
const dotenv = require("dotenv")
const Connectdb = require("./config/db")
Connectdb();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
dotenv.config();


app.get('/',(req,res)=>{
    res.render("index");
})

app.use('/user',userRoute);

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

