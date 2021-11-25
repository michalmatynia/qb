const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    product_thead: {
        required: true,
        type: String,
    },
    column_one_thead: {
        required: true,
        type: String,
    },
    column_two_thead: {
        required: true,
        type: String,
    },
    variant_one_thead: {
        required: true,
        type: String,
    },
    variant_two_thead: {
        required: true,
        type: String,
    },
    price_thead: {
        required: true,
        type: String,
    },
    quantity_thead: {
        required: true,
        type: String,
    },
    amount_thead: {
        required: true,
        type: String,
    },
    total: {
        required: true,
        type: String,
    },
    complete_btn: {
        required: true,
        type: String,
    },
    title_guestchk: {
        required: true,
        type: String,
    },
    email_guestchk: {
        required: true,
        type: String,
    },
    address_guestchk: {
        required: true,
        type: String,
    },
    phone_guestchk: {
        required: true,
        type: String,
    },
    ordersent_msg: {
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
}, { timestamps: true });

queryhelpers(Schema)

const Cart = mongoose.model('Cart', Schema);

module.exports = { Cart }