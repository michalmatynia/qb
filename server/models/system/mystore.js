const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    view_btn: {
        required: true,
        type: String,
    },
    buy_btn: {
        required: true,
        type: String,
    },
    loadmore_btn: {
        required: true,
        type: String,
    },
    addedtocart_msg: {
        required: true,
        type: String,
    },
    pricerange_nametag: {
        required: true,
        type: String,
    },
    column_one_nametag: {
        required: false,
        type: String,
    },
    column_two_nametag: {
        required: false,
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
},{timestamps:true});

queryhelpers(Schema)

const Mystore = mongoose.model('Mystore', Schema);

module.exports = { Mystore }