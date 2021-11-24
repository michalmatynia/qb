const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 100
    },
    lineTwo: {
        required: true,
        type: String,
    },
    referenceID: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Taxonomy'
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
    },
    visible:{
        required: true,
        type: Boolean
    }
},{timestamps:true});

queryhelpers(Schema)

const Block = mongoose.model('Block', Schema);

module.exports = { Block }