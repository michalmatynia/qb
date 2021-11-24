import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_baseFindMany_vh2({ 
    cell, 
    redux_localeuser, 
    dispatch,
    isLocalStorage,
    model, 
    populate = null, 
    poliglot = null,  
    inQuery = null, 
    distinct = null 
    }) {
    // const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    if (poliglot === null) {
        poliglot = isLocalStorage.poliglot
    }
    if (!model) {
        if('model' in cellvalue.fillfields.value.fromconfig) {
            model = cellvalue.fillfields.value.fromconfig.model
        } else {
            model = isLocalStorage.model
        }
    } 

    if (!inQuery){
        inQuery = {}
    }
    
    if (poliglot) {
        inQuery = Object.assign(inQuery, {
            country: { "$eq": redux_localeuser.referenceID.alpha2Code },
            language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
        });
    }

    let responseoptions = await plg_findMany({ model, dispatch, actionType: 'samestate', inQuery, populate, distinct })

    return responseoptions.payload

}