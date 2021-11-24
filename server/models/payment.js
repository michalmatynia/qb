const mongoose = require('mongoose');
const { queryhelpers } = require('../models/model_funcs');

const Schema = mongoose.Schema({
user:{
    type: Array,
    default:[]
},
data:{
    type: Array,
    default: []
},
product:{
    type: Array,
    default: []
}
})

queryhelpers(Schema)

const Payment = mongoose.model('Payment', Schema);

module.exports = {Payment}