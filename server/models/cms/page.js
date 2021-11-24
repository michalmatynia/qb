const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    description: {
        required: false,
        type: String,
    },
    checked: {
        type: Array,
        required: false,
    },
    link_to: {
        required: false,
        type: String,
        maxlength: 200
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
    isdefault: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    }
}, { timestamps: true });

queryhelpers(Schema)

const Page = mongoose.model('Page', Schema);

module.exports = { Page }