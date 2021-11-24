const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        // maxlength: 100
    },
    title: {
        required: false,
        type: String,
    },
    description: {
        required: false,
        type: String,
    },
    btn_execute: {
        required: false,
        type: String,
    },
    category: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
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
    lgbinder:{
        required: false,
        type: String,
    },
    visible:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true});

queryhelpers(Schema)

const Slide = mongoose.model('Slide', Schema);

module.exports = { Slide }