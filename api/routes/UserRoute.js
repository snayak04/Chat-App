const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const mongoose = require('mongoose');
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "Nothing Here!"
    });
});

encryptPasswordAndCreateUser = (req, res)=>{
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash)=>{
        if(err) 
            res.status(500).json({
                error:err
            });
        else{
            const user = new User({
                _id:mongoose.Schema.Types.ObjectId,
                email:req.body.email,
                password: hash,
                phone: req.body.phone,
                friends:[]
            });
            
            user.save()
            .then((user)=>{
                console.log(user);
                res.status(201).json({
                    message: "User Created!"
                })
            })
            .cathc((err)=>{
                res.status(500).json({
                    error: err
                });
            });
        }
    });
};   

router.post('/signup', (req, res, next)=>{
    const email = req.body.email;
    console.log(`email: ${email} password: ${req.body.password} phone: ${req.body.phone}`);
    const user = User.find({email:email})
    .exec()
    .then((user)=>{
        if (user.length>0)
            res.status(409).json({
                message: "Email already in use"
            });
        else
            encryptPasswordAndCreateUser(req, res);
    })
    .catch((err)=>{
        console.log(err);
    })  
});

module.exports = router;