const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({
    
        name: {
            required: true,
            type: String,
        },
        position: {
            type: Number,
            maxlength: 1000
        },
        visible: {
            required: true,
            type: Boolean,
        },
    
    req: {
        method: {
            required: true,
            type: String,
        },
        baseURL: {
            required: true,
            type: String,
        },
    },
    data: {
        source: {
            required: false,
            type: String,
        },
        target: {
            required: false,
            type: String,
        },
        q: {
            required: false,
            type: String,
        }
    },
    settings: {
        lastcalled: {
            required: false,
            type: Date,
        },
        dailylimit: {
            required: false,
            type: Number,
        },
        callcounter: {
            required: false,
            type: Number,
        },
        limitexpiration: {
            required: false,
            type: Date,
        }
    },
    syncdata: {
        rates : {
            required: false,
            type: mongoose.Mixed
        },
        base : {
            required: false,
            type: String,
        }

    }

},{timestamps:true})

queryhelpers(Schema)


const Transengine = mongoose.model('Transengine', Schema);

module.exports = { Transengine }