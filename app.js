const express = require("express");
const userRoute = require("./routes/user.routes")
const dotenv = require("dotenv")
const connectdb = require("./config/db")
connectdb();
const cookieParser = require("cookie-parser")
const indexrouter = require("./routes/index.routes")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');
dotenv.config();


app.get('/',(req,res)=>{
    res.render("index");
})

app.use('/',indexrouter)
app.use('/user',userRoute);

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

