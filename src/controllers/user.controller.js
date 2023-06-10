const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.get = async (req,res)=>{
    try{
        const user = await User.find({});
        res.render("list",{
            user:user,
        })
    }catch (e) {
        res.send(e)
    }
}
exports.createForm = (req,res)=>{
    res.render("createUser")
};
exports.save =async (req,res)=>{
    let existUser = await User.findOne({username:req.body.username});
    if(existUser) return res.status(422).send("User Name is exist");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    //save to DB
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashPassword,
        mobilenumber:req.body.mobilenumber
    })
    user.save().then(rs=>res.redirect("/users/list")).catch(err=>res.send(err));
};
exports.editForm = (req,res)=>{
    let id = req.params.id;
    User.findById(id).then(rs=>{
        res.render("editUser",{
            data:rs
        });
    }).catch(err=>{
        res.send(err);
    })
};
exports.update = (req,res)=>{
    let id = req.params.id;
    let s = req.body;
    User.findByIdAndUpdate(id,s)
        .then(rs=>res.redirect("/users/list"))
        .catch(err=>res.send(err));
};
exports.delete = (req,res)=>{
    let id = req.params.id;
    User.findByIdAndDelete(id)
        .then(rs=>res.redirect("/users/list"))
        .catch(err=>res.send(err));
};