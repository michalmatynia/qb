const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        // maxlength: 100
    },
    description: {
        required: false,
        type: String,
    },
    title: {
        required: false,
        type: String,
    },
    btn_launch: {
        required: false,
        type: String,
    },
    btn_launch_link: {
        required: false,
        type: String,
    },
    htmltype: {
        type: String,
        required: true,
    },
    checked: {
        type: Array,
        required: false,
    },
    blockstyle: {
        type: Array,
        required: false,
    },
    position: {
        required: true,
        type: Number,
        maxlength: 4
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
    visible: {
        required: true,
        type: Boolean
    },
    css_wrap_card: {
        required: true,
        type: Boolean
    },
    css_wrap_container: {
        required: true,
        type: Boolean
    },
    css_wrap_mainraised: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    },
}, { timestamps: true });

queryhelpers(Schema)

const Brick = mongoose.model('Brick', Schema);

module.exports = { Brick }