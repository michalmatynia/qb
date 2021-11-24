
import {
    plg_findMany,

} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_IDtoValue({ cell, getlist, model, myprops, mystate = null, populate = null, poliglot = null, fields = null }) {
    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let inQuery

    if (fields) {
        inQuery = {
            _id: { "$eq": fields[cellkey] }
        }
    } else if (getlist) {

        if (Array.isArray(getlist)) {
            inQuery = { _id: { "$in": getlist } }
        } else {
            inQuery = { _id: { "$eq": getlist } }
        }
    }

    if (poliglot) {
        inQuery = Object.assign(inQuery, {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });
    }


    if (!model) {
        if('model' in cellvalue.fillfields.value.fromconfig) {
            model = cellvalue.fillfields.value.fromconfig.model
        } else {
            model = mystate.localStorage.model
        }
    } 

    let result = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery, populate })

    return result.payload
}