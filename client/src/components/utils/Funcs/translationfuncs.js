import {
    plg_updateOne_queMod_oprMod,
} from '../../utils/Plugs/cms_plugs';

import {
    act_getCreds_Google,
    act_APIcall_mod
} from '../../../redux/actions/generic/generic_actions'

export async function runtranslation({ source_lg = null, target_lg = null, content = null, myprops = null, engine = null }) {
    let translation
    let response

    try {

        let axiosconfig = await makeaxiosconf({ engine, source_lg, target_lg, content, myprops })
        let updatedengine = await updateEngine({engine, myprops})

        engine = {...updatedengine.payload}


        const { settings } = engine

        // =================

        if (settings.callcounter === 0) {
            response = { Success: false, result: 'Call counter is zero', settings }
            return response
        } else {
            translation = await act_APIcall_mod({ axiosconfig })


            let result = await formatoutput({ translation, engine })

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
export async function updateEngine({ engine = null, myprops = null }) {

    let newEngine = { ...engine }
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


    let inQuery = { name: { "$eq": engine.name } }
    let inOperator = { '$set': newEngine }
    let inParams = { new: true }

    let result = await plg_updateOne_queMod_oprMod({ model: 'transengine', myprops, actionType: 'samestate', inQuery, inOperator, inParams })

    return result
    // return engine
}
const makeaxiosconf = async ({ engine = null, source_lg = null, target_lg = null, content = null, myprops = null }) => {
    let axiosconfig = null;

    switch (engine.name) {
        case ('MyMemory'):
            axiosconfig = {
                method: engine.req.method,
                headers: engine.req.headers,
                baseURL: engine.req.baseURL,
                // params: null,
                params: {
                    langpair: source_lg + '|' + target_lg,
                    q: content
                },
                // data: {my : data},
                //    auth: {
                //     username: 'janedoe',
                //     password: 's00pers3cret'
                //   },
                //withCredentials: false
                // responseType: 'json', // default
                // responseEncoding: 'utf8', // default
                // xsrfCookieName: 'XSRF-TOKEN', // default
                // xsrfHeaderName: 'X-XSRF-TOKEN', // default
            }
            break;
        case ('GoogleTranslator'):
            // Model is not necessary here
            let key = await act_getCreds_Google()
            axiosconfig = {
                method: engine.req.method,
                baseURL: engine.req.baseURL,
                // params: null,
                params: {
                    source: source_lg,
                    target: target_lg,
                    q: content,
                    key: key.payload
                },
            }
            break;
        default:
            axiosconfig = null;
    }

    return axiosconfig;
}

const formatoutput = async ({ translation = null, engine = null }) => {
    let output = null;

    switch (engine.name) {
        case ('MyMemory'):
            output = translation.payload.responseData.translatedText
            if (output !== null) {
                output = output.replace(/&#39;/g, '\'');
            } else {
                output = '#'
            }
            break;
        case ('GoogleTranslator'):
            output = translation.payload.data.translations[0].translatedText
            if (output !== null) {
                output = output.replace(/&#39;/g, '\'');
            } else {
                output = '#'
            }
            break;
        default:
            output = null;
    }
    return output;
}

const handleError = async ({ error = null, engine = null }) => {
    let output

    // error = { error }
    // console.log(error);

    switch (engine.name) {
        case ('MyMemory'):
            output = error.response.data.responseData.translatedText
            break;
        case ('GoogleTranslator'):
            output = error
            break;
        default:
            output = null;
    }
    return output;
}