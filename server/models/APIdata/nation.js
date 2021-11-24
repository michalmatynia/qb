// Version 3

// const mongoose = require('mongoose');
// const { queryhelpers } = require('../model_funcs');

// const Schema = mongoose.Schema({

//     name: {
//         type: mongoose.Mixed,
//         default: {}
//     },
//     tld: {
//         type: Array,
//         default: []
//     },
//     cca2: {
//         type: String,
//         maxlength: 2
//     },
//     ccn3: {
//         type: String,
//     },
//     cca3: {
//         type: String,
//         maxlength: 3
//     },
//     cioc: {
//         type: String,
//     },
//     independent: {
//         required: true,
//         type: Boolean
//     },
//     status: {
//         type: String,
//     },
//     unMember: {
//         required: true,
//         type: Boolean
//     },
//     currencies: {
//         type: mongoose.Mixed,
//         default: {}
//     },
//     idd: {
//         type: mongoose.Mixed,
//         default: {}
//     },
//     capital: {
//         type: Array,
//     },
//     altSpellings: {
//         type: Array,
//         default: []
//     },
//     region: {
//         type: String,
//         maxlength: 100

//     },
//     subregion: {
//         type: String,
//         maxlength: 100

//     },
//     languages: {
//         type: mongoose.Mixed,

//     },
//     translations: {
//         type: mongoose.Mixed,
//         default: {}
//     },
//     latlng: {
//         type: Array,
//         default: []
//     },
//     landlocked: {
//         type: Boolean
//     },
//     area: {
//         type: Number,
//         maxlength: 100
//     },
//     flag: {
//         type: String,
//         maxlength: 100

//     },
//     flags: {
//         type: Array,
//     },
//     demonyms: {
//         type: mongoose.Mixed,
//         default: {}
//     },

// }, { timestamps: true });

// queryhelpers(Schema)

// const Nation = mongoose.model('Nation', Schema);

// module.exports = { Nation }

// Version 2 ==========

const mongoose = require('mongoose');
const { queryhelpers } = require('../model_funcs');

const Schema = mongoose.Schema({

    name: {
        type: String,
    },
    topLevelDomain: {
        type: Array,
        default: []
    },
    alpha2Code: {
        type: String,
        maxlength: 2

    },
    alpha3Code: {
        type: String,
        maxlength: 3

    },
    callingCodes: {
        type: Array,
        default: []
    },
    capital: {
        type: Array,

    },
    altSpellings: {
        type: Array,
        default: []
    },
    region: {
        type: String,
    },
    continent: {
        type: String,
    },
    population: {
        type: Number,
    },
    latlng: {
        type: Array,
        default: []
    },
    demonym: {
        type: String,
    },
    area: {
        type: Number,
    },
    gini: {
        type: Number,
    },
    timezones: {
        type: Array,
        default: []
    },
    borders: {
        type: Array,
        default: []
    },
    nativeName: {
        type: String,
    },
    numericCode: {
        type: String,
        maxlength: 3
    },
    currencies: {
        type: Array,
        default: []
    },
    languages: {
        type: Array,
        default: []
    },
    translations: {
        type: mongoose.Mixed,
        default: {}
    },
    flags: {
        type: Array,
        default: []
    },
    regionalBlocs: {
        type: Array,
        default: []
    },
    cioc: {
        type: String,
        maxlength: 3
    },
    independent: {
        type: Boolean
    },

}, { timestamps: true });

queryhelpers(Schema)

const Nation = mongoose.model('Nation', Schema);

module.exports = { Nation }