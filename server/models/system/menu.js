const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
        maxlength: 200
    },
    link_to: {
        required: true,
        type: String,
        maxlength: 200
    },
    level: {
        required: true,
        type: String,
        maxlength: 200
    },
    position:{
        required: true,
        type: Number,
        maxlength: 4
    },
    public: {
        required: true,
        type: Boolean,
    },
    visible: {
        required: true,
        type: Boolean,
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

const Menu = mongoose.model('Menu', Schema);

module.exports = { Menu }