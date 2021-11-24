const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema(
    {
        referenceID: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Nation'
        },
        position: {
            type: Number,
            maxlength: 10000
        },
        visible: {
            required: true,
            type: Boolean
        },
        model: {
            required: true,
            type: String,
        },
    }
    , { timestamps: true });

queryhelpers(Schema)

const Language = mongoose.model('Language', Schema);

module.exports = { Language }