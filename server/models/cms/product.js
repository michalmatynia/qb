const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

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
    description_two: {
        required: false,
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
    type: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
    },
    variant_one_name: {
        required: false,
        type: String,
        // unique: 1,
    },
    variant_one_toggle:{
        required: true,
        type: Boolean
    },
    variant_one_taxo: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
    },
    variant_two_name: {
        required: false,
        type: String,
        // unique: 1,
    },
    variant_two_toggle:{
        required: true,
        type: Boolean
    },
    variant_two_taxo: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    inventory: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
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

const Product = mongoose.model('Product', Schema);

module.exports = { Product }