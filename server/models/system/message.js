const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({
    type: {
        required: true,
        type: String,
        maxlength: 100
    },
    text: {
        required: true,
        type: String,
    },
    language:{
        required: true,
        type: String,
        maxlength: 2
    },
    country:{
        required: true,
        type: String,
        maxlength: 2
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
    },
    lgbinder:{
        required: false,
        type: String,
    },
    visible:{
        required: true,
        type: Boolean
    }
},{timestamps:true});

queryhelpers(Schema)

const Message = mongoose.model('Message', Schema);

module.exports = { Message }