const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

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
    typetagmain: {
        type: Array,
        required: false,
    },
    tagparent: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
    },
    tagchild: {
        type: Array,
        required: false,
        ref: 'Taxonomy'
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

// Add distinction if String or Arrays
queryhelpers(Schema)

const Taxonomy = mongoose.model('Taxonomy', Schema);

module.exports = { Taxonomy }