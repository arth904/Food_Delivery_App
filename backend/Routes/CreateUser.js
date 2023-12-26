const express = require("express");
const router = express.Router();
const User  = require("../models/User")
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const jwtSecret = "uioasdandioanwoindoaiwdiawn"

router.post("/createuser", 
[body('email').isEmail(),
body('password').isLength({min:5})],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);
try{
    await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
    })
    res.json({success:true});
}catch(error){
    console.log(error);
    res.json({success:false});
}
})

router.post("/loginuser", 
[body('email').isEmail(),
body('password').isLength({min:5})],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

try{
    let email = req.body.email;
    let user_data = await User.findOne({email});
    if(!user_data)
    {
        return res.status(400).json({errors: "Enter valid Email Id"});
    }
    const pwdCompare = await bcrypt.compare(req.body.password,user_data.password)
    if(!pwdCompare)
    return res.status(400).json({errors: "Wrong Password"});
    const data = {
         user: {
            id: user_data.id
         }
    }
    const authToken = jwt.sign(data,jwtSecret);
    return res.json({success:true,authToken: authToken});
}catch(error){
    console.log(error);
    res.json({success:false});
}
})

module.exports = router;