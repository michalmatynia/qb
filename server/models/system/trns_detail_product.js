const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    description_one_nametag: {
        required: true,
        type: String,
    },
    description_two_nametag: {
        required: true,
        type: String,
    },
    similar_product_nametag: {
        required: true,
        type: String,
    },
    back_btn: {
        required: true,
        type: String,
    },
    buy_btn: {
        required: true,
        type: String,
    },

    addedtocart_msg: {
        required: true,
        type: String,
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
    },
    image_filter: {
        required: false,
        type: String,
    },
    checked: {
        type: Array,
        required: false,
    },
},{timestamps:true});

queryhelpers(Schema)

const Trnsdetailproduct = mongoose.model('Trnsdetailproduct', Schema);

module.exports = { Trnsdetailproduct }