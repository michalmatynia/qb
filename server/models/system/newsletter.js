const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    // total: {
    //     required: true,
    //     type: String,
    // },
    // complete_btn: {
    //     required: true,
    //     type: String,
    // },
    position: {
        type: Number,
        maxlength: 1000
    },
    isdefault: {
        required: true,
        type: Boolean,
    },
},{timestamps:true});

queryhelpers(Schema)

const Newsletter = mongoose.model('Newsletter', Schema);

module.exports = { Newsletter }