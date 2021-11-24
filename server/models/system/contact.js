const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    title: {
        required: false,
        type: String,
    },
    description: {
        required: false,
        type: String,
    },
    form_fname: {
        required: false,
        type: String,
    },
    form_lname: {
        required: false,
        type: String,
    },
    form_email: {
        required: false,
        type: String,
    },
    form_yourmessage: {
        required: false,
        type: String,
    },
    form_notrobot: {
        required: false,
        type: String,
    },
    btn_execute: {
        required: false,
        type: String,
    },
    tag_findus: {
        required: false,
        type: String,
    },
    tag_callus: {
        required: false,
        type: String,
    },
    messagesent_msg: {
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

const Contact = mongoose.model('Contact', Schema);

module.exports = { Contact }