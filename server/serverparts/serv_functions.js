const { Slide } = require('../models/cms/slide');
const { Product } = require('../models/cms/product');
const { Productgroup } = require('../models/cms/productgroup');
const { Page } = require('../models/cms/page');
const { View } = require('../models/cms/view');
const { Brick } = require('../models/cms/brick');
const { User } = require('../models/system/user');

const { Nation } = require('../models/APIdata/nation');
const { Language } = require('../models/system/language');
const { Menu } = require('../models/system/menu');
const { Message } = require('../models/system/message');
const { Mysite } = require('../models/system/mysite');
const { Taxonomy } = require('../models/system/taxonomy');
const { Transengine } = require('../models/system/transengine');
const { Theme } = require('../models/system/theme');
const { Cart } = require('../models/system/cart');
const { Contact } = require('../models/system/contact');
const { Login } = require('../models/system/login');
const { Visit } = require('../models/system/visit');

const { Mystore } = require('../models/system/mystore');
const { Newsletter } = require('../models/system/newsletter');
const { Blockstyle } = require('../models/system/blockstyle');

const { Trnsdetailproduct } = require('../models/system/trns_detail_product');


const { myObjectFilter_onArray, myObjectFilterByKey } = require('./basefuncs_serv');

// This is a new version of Assign Model (searches for model in body of request. and not query arguments)
exports.applyModel = (req, depth) => {
    if (req.body.model && depth === 1) {
        findModel = req.body.model
    } else if (req.body.model2 && depth === 2) {
        findModel = req.body.model2
    }

    if (findModel === 'nation') {
        return Nation;
    } else if (findModel === 'language') {

        return Language;
    } else if (findModel === 'brick') {

        return Brick;
    } else if (findModel === 'menu') {

        return Menu;
    } else if (findModel === 'mysite') {

        return Mysite;
    } else if (findModel === 'taxonomy') {

        return Taxonomy;
    } else if (findModel === 'product') {

        return Product;
    } else if (findModel === 'productgroup') {

        return Productgroup;
    } else if (findModel === 'page') {

        return Page;
    } else if (findModel === 'view') {

        return View;
    } else if (findModel === 'slide') {

        return Slide;
    } else if (findModel === 'message') {

        return Message;
    } else if (findModel === 'transengine') {

        return Transengine;
    } else if (findModel === 'user') {

        return User;
    } else if (findModel === 'theme') {

        return Theme;
    } else if (findModel === 'cart') {

        return Cart;
    } else if (findModel === 'contact') {

        return Contact;
    } else if (findModel === 'login') {

        return Login;
    } else if (findModel === 'mystore') {

        return Mystore;
    } else if (findModel === 'newsletter') {

        return Newsletter;
    } else if (findModel === 'blockstyle') {

        return Blockstyle;
    } else if (findModel === 'visit') {

        return Visit;
    } else if (findModel === 'trnsdetailproduct') {

        return Trnsdetailproduct;
    }

    
    
};
exports.filterQueryAndId = (req) => {

    let allArgs = {}

    for (const [key, value] of Object.entries(req.query)) {

        if (key !== 'sortBy' && key !== 'sortOrder' && key !== 'limit' && key !== 'skip' && key !== '_id' && key !== 'searchtext' && key !== 'searchrange' && key !== 'searchdepth' && key !== 'model' && key !== 'model2' && key !== 'checked' && key !== 'distinct' && key !== 'populate') {
            allArgs[key] = value

        }

    }

    if (allArgs !== undefined) {
        return allArgs
    } else { return null }
}
exports.parseSearchField = ({ insert = null }) => {
    let obj
    if (insert.searchrange !== undefined && insert.searchrange !== '') {
        let pattern = ''
        if (insert.searchtext === undefined || insert.searchtext === '') {
            pattern = new RegExp(`^`, 'i');
        } else {
            pattern = new RegExp(`${insert.searchtext}`, 'i');
        }

        // Search text argument doesn't appear, so it needs to be avoided
        // range moze wchodzic glebiej np. languages[0].code albo name

        rangeAr = insert.searchrange
        let rangeQueryAr = []
        rangeAr.forEach((range) => {
            rangeQueryAr.push({ [range]: { "$regex": pattern } })
        })

        obj = { "$or": rangeQueryAr }

    }

    if (obj !== undefined) {
        return obj
    } else { return null }
}
exports.parseQuery_QueMod = async (req) => {

    let reqBodyQuery = { ...req.body.reqquery }

    let queryObject = Object.assign(queryObject, reqBodyQuery);


    if (queryObject !== undefined) {
        return queryObject
    } else { return null }
}