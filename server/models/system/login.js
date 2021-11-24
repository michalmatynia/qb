const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    description: {
        required: false,
        type: String,
    },
    form_email: {
        required: false,
        type: String,
    },
    form_password: {
        required: false,
        type: String,
    },
    btn_login: {
        required: false,
        type: String,
    },
    btn_register: {
        required: false,
        type: String,
    },
    btn_forgotpassword: {
        required: false,
        type: String,
    },
    message_loginfailed: {
        required: false,
        type: String,
    },
    htmltype: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        maxlength: 1000
    },
    isdefault: {
        required: true,
        type: Boolean,
    },
    language: {
        required: true,
        type: String,
        maxlength: 2
    },
    country: {
        required: true,
        type: String,
        maxlength: 2
    },
    lgbinder: {
        required: false,
        type: String,
    },
    images: {
        type: Array,
        default: []
    }
},{timestamps:true});

queryhelpers(Schema)

const Login = mongoose.model('Login', Schema);

module.exports = { Login }