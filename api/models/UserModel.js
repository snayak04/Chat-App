const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type:String,
            unique: true,
            match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    password: String,
    friends:[{type:String, unique:true}],
    phone: Number        
});

module.exports = mongoose.model('User', UserSchema);