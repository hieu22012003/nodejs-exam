const express = require("express");
require("dotenv").config();
const database = require("./src/database");

const {Model} = require("mongoose");


const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Sever is running...");
})
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const session =require("express-session");
app.use(session({

    resave:true,
    saveUninitialized:true,
    secret:"t2204m",
    cookie:{
        maxAge:3600000,

    }
}))

const userRoute = require("./src/routers/user.router");
app.use("/users",userRoute);

app.get("/",(req,res)=>{
    res.render("home",{
    })
})