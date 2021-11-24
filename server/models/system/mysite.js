const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    address_fname: {
        required: false,
        type: String,
    },
    address_lname: {
        required: false,
        type: String,
    },
    address_street: {
        required: false,
        type: String,
    },
    address_zip: {
        required: false,
        type: String,
    },
    address_city: {
        required: false,
        type: String,
    },
    address_country: {
        required: false,
        type: String,
    },
    address_telephone: {
        required: false,
        type: String,
    },
    files_upload_default_size: {
        required: false,
        type: Boolean,    
    },
    files_upload_width: {
        required: false,
        type: String,
    },
    files_upload_height: {
        required: false,
        type: String,
    },
    files_usecloud: {
        required: false,
        type: Boolean,    
    },
    files_remove_from_cloud: {
        required: false,
        type: Boolean,    
    },
    position: {
        type: Number,
        maxlength: 1000
    },
    isdefault: {
        required: true,
        type: Boolean,
    },
    estore: {
        required: false,
        type: Boolean,
    },
    default_language: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Language'
    },
    translation_engine: {
        required: true,
        type: String,
    },
    conversion_engine: {
        required: true,
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    checked: {
        type: Array,
        required: false,
    },
},{timestamps:true});

queryhelpers(Schema)

const Mysite = mongoose.model('Mysite', Schema);

module.exports = { Mysite }