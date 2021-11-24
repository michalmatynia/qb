const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({
    
        Success: {
            required: true,
            type: Boolean,
        },
        data: {
            required: true,
            type: mongoose.Mixed
        },
        arin: {
            required: false,
            type: mongoose.Mixed
        },
        ip: {
            required: true,
            type: String,
        },
   
},{timestamps:true})

queryhelpers(Schema)


const Visit = mongoose.model('Visit', Schema);

module.exports = { Visit }