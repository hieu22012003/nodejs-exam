let mongoose = require("mongoose");

let user = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:1,
        maxLength:255
    },
    lastname:{
        type:String,
        required:true,
        minLength:1,
        maxLength:255
    },
    username:{
        type:String,
        required:true,
        minLength:[6,"do dai toi thieu la 6"],
        maxLength:255
    },
    mobilenumber: {
        type:String,
        required:true,
        validate:{
            validator: (v)=>{
                const regExp = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}[0-9]{4}/;
                return v.match(regExp) && v.startsWith("0")
            },
            message: t => `${t.value} phai bat dau bang 0`
        }
    }
})
module.exports = mongoose.model("User", user);