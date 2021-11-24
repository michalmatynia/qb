const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({
    images:{
        type: Array,
        default:[]
    },
    name: {
        required: true,
        type: String,
        // unique: 1,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
    },
    price: {
        required: false,
        type: Number,
        maxlength: 255
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
    inventory: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    visible:{
        required: true,
        type: Boolean
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
    checked: {
        referenceID:{
            type: Array,
            required: false,
            ref: 'Taxonomy'
        }
        // type: Array,
        // required: false,
    },
},{timestamps:true});

queryhelpers(Schema)

const Productgroup = mongoose.model('Productgroup', Schema);

module.exports = { Productgroup }