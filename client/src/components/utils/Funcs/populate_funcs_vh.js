import {
    plg_countDocuments
} from '../../utils/Plugs/cms_plugs';
export async function populatePosition_vh3({ model = null, redux_localeuser,  dispatch, formdata = null, poliglot = null, type = null, fields = null, key = null}) {

    let inQuery
    let newFormData
    if (poliglot) {
        inQuery = {
            country: { "$eq": redux_localeuser.referenceID.alpha2Code },
            language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 },
        }
    }

    let count = await plg_countDocuments({ model, dispatch, actionType: 'samestate', inQuery })

    let totalPos = [];

    
    if (count.payload > 0) {

        for (let i = 1; i <= count.payload; i++) {
            totalPos.push(i)
        }
    }

    if (type === 'add') {
        totalPos.push(totalPos.length + 1)
    }

    newFormData = {
        ...formdata
    }

    newFormData[key].config.options = [...totalPos];

    // objac gore
    if (type === 'add') {
        newFormData[key].value = totalPos.length
    }
    else if (type === 'edit') {

        newFormData[key].value = fields[key]
    }

    return newFormData[key];
}
