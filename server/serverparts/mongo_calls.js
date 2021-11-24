const mongoose = require('mongoose');

const { assignModel, applyModel, parseSearchField, filterQueryAndId, parseSearch } = require('../serverparts/serv_functions');
const { myObjectFilterByKey } = require('../serverparts/basefuncs_serv');
// const { response } = require('express');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
// { $set:
//     {
//       quantity: 500,
//       details: { model: "14Q3", make: "xyz" },
//       tags: [ "coats", "outerwear", "clothing" ]
//     }
//  }

// New Type
const findOneAndUpdate_QueMod_OprMod = async function ({ req }) {

    let populate

    // Populate
    if ('reqhelper' in req.body) {

        if (req.body.reqhelper.populate && Object.keys(req.body.reqhelper.populate).length > 0) {
            populate = req.body.reqhelper.populate
        }
    }

    let genericModel = applyModel(req, 1)


    let obj1
    if ('reqhelper' in req.body) {
        req.body.reqhelper.search ? obj1 = parseSearchField({ insert: req.body.reqhelper.search }) : obj1 = {}
    }
    
    let queryObject = { ...obj1, ...req.body.reqquery }
    let operatorObject = { ...obj1, ...req.body.reqoperator }
    let paramsObject = { ...obj1, ...req.body.reqparams }

    result = await genericModel.
        findOneAndUpdate(queryObject, operatorObject, paramsObject)
        .populate_loop(populate)


    return result

}
const UpdateMany_QueMod = async function ({ req }) {

    let genericModel = applyModel(req, 1)
    let obj1

    let queryObject = { ...obj1, ...req.body.reqquery }
    let operatorObject = { ...obj1, ...req.body.reqoperator }
    let paramsObject = { ...obj1, ...req.body.reqparams }

    return await genericModel.updateMany(queryObject, operatorObject, paramsObject)

}
const deleteMany_ModMod = async function ({ req }) {

    let genericModel = applyModel(req, 1)

    let obj1

    let queryObject = { ...obj1, ...req.body.reqquery }

    result = await genericModel.
        findOneAndDelete(queryObject)
    return result

}
const insertMany_ModMod = async function ({ req }) {
    let genericModel = applyModel(req, 1)

    let entities = []

    if (Object.keys(req.body.reqinsertmodel).length > 0) {

        for (const value of Object.values(req.body.reqinsertmodel)) {

            entities.push(new genericModel(value))
        }
    }

    return await genericModel.insertMany(entities)

}
const findManyQueMod = async function ({ req }) {

    let populate
    let sortBy
    let sortOrder
    let sort
    let distinct
    let limit
    let skip

    if ('reqhelper' in req.body) {
        // Populate
        if (req.body.reqhelper.populate && Object.keys(req.body.reqhelper.populate).length > 0) {
            populate = req.body.reqhelper.populate
        }

        sortBy = req.body.reqhelper.sortBy ? req.body.reqhelper.sortBy : 'position';
        sortOrder = req.body.reqhelper.sortOrder ? req.body.reqhelper.sortOrder : 1;
        sort = { [sortBy]: sortOrder }

        distinct = req.body.reqhelper.distinct ? req.body.reqhelper.distinct : null;

        limit = req.body.reqhelper.limit ? parseInt(req.body.reqhelper.limit) : null;
        skip = req.body.reqhelper.skip ? parseInt(req.body.reqhelper.skip) : 0;
    }

    let genericModel = applyModel(req, 1)

    let obj1
    req.body.reqhelper.search ? obj1 = parseSearchField({ insert: req.body.reqhelper.search }) : obj1 = {}

    let queryObject = { ...obj1, ...req.body.reqquery }

    let result

    if (!distinct) {

        result = await genericModel.
            find(queryObject)
            .populate_loop(populate)
            .sort(sort)
            .limit(limit)
            .skip(skip)

    } else if (distinct) {

        result = await genericModel.
            find(queryObject)
            .distinct(distinct)
    }

    return result

}
const findOneAndDelete_QueMod = async function ({ req }) {

    let populate

    // Populate
    if (req.body.reqhelper.populate && Object.keys(req.body.reqhelper.populate).length > 0) {
        populate = req.body.reqhelper.populate
    }

    let genericModel = applyModel(req, 1)

    let obj1

    let queryObject = { ...obj1, ...req.body.reqquery }
    let paramsObject = { ...obj1, ...req.body.reqparams }

    result = await genericModel.
        findOneAndDelete(queryObject, paramsObject)
        .populate_loop(populate)

    return result

}
const create_OprMod = async function ({ req }) {

    let genericModel = applyModel(req, 1)

    let newObject = Object.assign(req.body.reqinsertmodel, req.body.reqmodelparams);

    const entity = new genericModel(newObject);

    return await genericModel.create(entity)
}
const countDocuments = async function ({ req }) {

    limit = req.body.reqhelper.limit ? parseInt(req.body.reqhelper.limit) : null;
    skip = req.body.reqhelper.skip ? parseInt(req.body.reqhelper.skip) : 0;

    let genericModel = applyModel(req, 1)

    let obj1
    req.body.reqhelper.search ? obj1 = parseSearchField({ insert: req.body.reqhelper.search }) : obj1 = {}

    let queryObject = { ...obj1, ...req.body.reqquery }

    result = await genericModel.
        countDocuments(queryObject)
        .limit(limit)
        .skip(skip)

    return result

}
const uploadFile_Cloudinary = async function ({ req, inParams = null }) {

    return await cloudinary.v2.uploader.upload(req.files.file.path, inParams)

}
const removeFile_Cloudinary = async function ({ req }) {

    return await cloudinary.v2.uploader.destroy(req.body.reqoperator)

}

const findOne_QueMod = async function ({ req }) {

    let populate

    // Populate
    if (req.body.reqhelper.populate && Object.keys(req.body.reqhelper.populate).length > 0) {
        populate = req.body.reqhelper.populate
    }

    let genericModel = applyModel(req, 1)

    let obj1
    req.body.reqhelper.search ? obj1 = parseSearchField({ insert: req.body.reqhelper.search }) : obj1 = {}

    let queryObject = { ...obj1, ...req.body.reqquery }
    let paramsObject = { ...obj1, ...req.body.reqparams }

    result = await genericModel.
        findOne(queryObject, paramsObject)
        .populate_loop(populate)

    return result

}
const aggregate_QueMod = async function ({ req }) {
    let genericModel = applyModel(req, 1)


    result = await genericModel.aggregate(req.body.reqquery)

    return result
}

module.exports = {
    findOneAndDelete_QueMod,
    UpdateMany_QueMod,
    deleteMany_ModMod,
    findManyQueMod,
    findOneAndUpdate_QueMod_OprMod,
    findOne_QueMod,
    insertMany_ModMod,
    create_OprMod,
    countDocuments,
    uploadFile_Cloudinary,
    removeFile_Cloudinary,
    aggregate_QueMod
}