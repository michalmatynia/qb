const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    description: {
        required: true,
        type: String,
    },
    viewparams: {
        model: {
            type: String,
            required: false,
        },
        limit: {
            type: Number,
            required: false,
        },
        sortby: {
            type: Number,
            required: false,
        }
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
    images: {
        type: Array,
        default: []
    }
}, { timestamps: true });

queryhelpers(Schema)

const View = mongoose.model('View', Schema);

module.exports = { View }