import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_baseFindMany({ cell, getlist, mystate, model, myprops, populate = null, poliglot = null, fields = null, inQuery = null, distinct = null }) {

    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if (!poliglot) {
        poliglot = mystate.localStorage.poliglot
    }
    if (!model) {
        if('model' in cellvalue.fillfields.value.fromconfig) {
            model = cellvalue.fillfields.value.fromconfig.model
        } else {
            model = mystate.localStorage.model
        }
    } 

    if (!inQuery){
        inQuery = {}
    }
    
    if (poliglot) {
        inQuery = Object.assign(inQuery, {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });
    }

    let responseoptions = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery, populate, distinct })

    return responseoptions.payload

}

