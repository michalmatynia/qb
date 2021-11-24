import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_handleArrayOfIds_vh1({ cell, fields = null }) {

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]
    let filteredIds
    if (fields) {
        filteredIds = fields[cellkey]
    } else {
        filteredIds = cellvalue.value
    }

    return filteredIds.map(a => a._id);
}
export async function actionFuncs_transformIdsToArray_vh1({ getlist = null, cell, fields = null, dispatch = null, populate = null }) {

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let inQuery = {}
    Object.assign(inQuery, { _id: { "$in": fields[cellkey] } })

    let result = await plg_findMany({ model: cellvalue.fillfields.value.fromconfig.model, dispatch, actionType: 'samestate', inQuery, populate })
    getlist = result.payload

    return getlist
}