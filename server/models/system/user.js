const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const SALT_I = 10;
const moment = require('moment');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
require('dotenv').config();
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    position: {
        required: true,
        type: Number,
        maxlength: 4
    },
    images: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    resetToken:{
        type:String
    },
    // Nie wiem dlaczego nie pokazuje moich pozycji na zwrotce
    // images tez przychodza puste
    // zzz:{
    //     type:String

    // },
    resetTokenExp:{
        type:Number
    }
},{timestamps:true})

Schema.pre('save', function (next) {

    var user = this;
        if (user.isModified('password')) {
        // Encrypt
        let hash = CryptoJS.AES.encrypt(JSON.stringify(user.password), process.env.SECRET);
        user.password = hash;
        next();

    } else {
        next()
    }
}) // END User schema

Schema.methods.comparePassword = function (candidatePassword, cb) {

    if(CryptoJS.AES.decrypt(this.password.toString(), process.env.SECRET).toString(CryptoJS.enc.Utf8) === JSON.stringify(candidatePassword)) {
        cb(null,true)
    } else {
        return cb(null, '')
    }

}

Schema.methods.generateResetToken = function(cb){
    var user = this;

    crypto.randomBytes(20,function(err,buffer){
        var token = buffer.toString('hex');
        var today = moment().startOf('day').valueOf();
        var tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;

        user.resetTokenExp = tomorrow;
        user.save(function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}

Schema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET)

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user)
    })

}

Schema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET, function (err, decode) {

        user.findOne({ "_id": decode, "token": token }, function (err, user) {

            if (err) return cb(err);
            cb(null, user);
        })

    }) // jwt.verify

}

queryhelpers(Schema)

const User = mongoose.model('User', Schema);

module.exports = { User }