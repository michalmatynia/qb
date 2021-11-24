const axios = require('axios');
require('dotenv').config();

const {
    findOneAndUpdate_QueMod_OprMod,
    findOne_QueMod } = require('../serverparts/mongo_calls');

const runApiCall = async ({ engine }) => {

    let response

    try {

        let axiosconfig = await makeaxiosconf({ engine })
        let updatedengine = await updateEngineCounter({ engine })

        const { settings } = updatedengine

        if (settings.callcounter === 0) {
            response = { Success: false, result: 'Call counter is zero', settings }
            return response
        } else {
            // console.log(axiosconfig);

            let apirequest = await axios(axiosconfig)
            // console.log(apirequest.data);

            let result = await formatoutput({ apirequest, engine: updatedengine })

            response = { Success: true, result, settings }
            return response

        }

    } catch (error) {


        console.log(error);
        const { settings } = engine
        // =================
        let result = await handleError({ error, engine: engine })

        response = { Success: false, result, settings }
        return response

    }

}

const makeaxiosconf = async ({ engine = null }) => {
    // process.env.CURRENCYEXCHANGE_CREDENTIALS

    // let key = 'dbb5588904a05eb0f009abbaa3bbd972'

    let axiosconfig = null;
    switch (engine.name) {

        case ('Currency Exchange P'):
            axiosconfig = {
                method: engine.req.method,
                baseURL: engine.req.baseURL,
                params: {
                    access_key: process.env.CURRENCYEXCHANGE_CREDENTIALS
                }
            }
            break;
        default:
            axiosconfig = null;
    }

    return axiosconfig;
}

const updateEngineCounter = async ({ engine = null }) => {

    let newEngine = { ...engine._doc }
    let datenow = new Date()
    let nextday = new Date()
    nextday.setDate(nextday.getDate() + 1);

    newEngine['settings']['lastcalled'] = datenow
    let limitexpiration

    if (engine.settings.limitexpiration === null) {
        limitexpiration = null
        newEngine['settings']['limitexpiration'] = nextday
        newEngine['settings']['callcounter'] = newEngine['settings']['dailylimit'] - 1

    } else if (engine.settings.limitexpiration !== null) {
        limitexpiration = new Date(engine.settings.limitexpiration)

        if (datenow > limitexpiration) {
            newEngine['settings']['limitexpiration'] = nextday
            newEngine['settings']['callcounter'] = newEngine['settings']['dailylimit'] - 1

        } else if (datenow < limitexpiration) {
            newEngine['settings']['callcounter'] === 0 ? newEngine['settings']['callcounter'] = 0 : newEngine['settings']['callcounter'] = newEngine['settings']['callcounter'] - 1
        }
    }


    // ===== Server Mongodb call

    let inQuery
    let inOperator
    let inParams

    inQuery = { name: { "$eq": engine.name } }
    inOperator = { '$set': newEngine }
    inParams = { new: true }

    let req = {body:{}}
    req.body = { reqhelper: {}, reqquery: inQuery, reqoperator: inOperator, reqparams: inParams, model: 'transengine'  }

    let result = await findOneAndUpdate_QueMod_OprMod({ req })

    return result
}

const formatoutput = async ({ apirequest = null, engine = null }) => {
    let output = null;

    switch (engine.name) {
        case ('Currency Exchange P'):
            output = apirequest.data
            output = { rates: apirequest.data.rates, base: apirequest.data.base }
            break;
        default:
            output = null;
    }
    return output;
}

const handleError = async ({ error = null, engine = null }) => {
    let output

    switch (engine.name) {
        case ('Currency Exchange P'):
            output = error
            break;
        default:
            output = null;
    }
    return output;
}

const syncEngineData = async ({ engine = null, apiCallResponse = null }) => {

    let inQuery
    let inOperator
    let inParams


    inQuery = { name: { "$eq": engine.name } }
    inParams = { new: true }


    switch (engine.name) {
        case ('Currency Exchange P'):
            inOperator = { '$set': { syncdata: { rates: apiCallResponse.rates, base: apiCallResponse.base } } }

            let req = {body: {}}
            req.body = { reqhelper: {}, reqquery: inQuery, reqoperator: inOperator, reqparams: inParams, model: 'transengine'  }

            await findOneAndUpdate_QueMod_OprMod({ req })
            break;


    }
}

exports.syncRates = async () => {

    let inQuery
    let req

    inQuery = {
        isdefault: { "$eq": true },
    }

    req = {}

    Object.assign(req, { body: { reqquery: inQuery } });
    Object.assign(req, { query: { populate: null, model: 'mysite' } });

    let defaultmysite = await findOne_QueMod({ req })

    inQuery = {
        name: { "$eq": defaultmysite.conversion_engine },
    }

    req = {}
    Object.assign(req, { body: { reqquery: inQuery } });
    Object.assign(req, { query: { populate: null, model: 'transengine' } });

    let engine = await findOne_QueMod({ req })

    let apiCallResponse = await runApiCall({ engine })

    if (apiCallResponse.Success) {

        // Change counter


        // await updateEngineCounter({ engine })
        await syncEngineData({ engine, apiCallResponse: apiCallResponse.result })

    } else {
        console.log(apiCallResponse);

    }

}