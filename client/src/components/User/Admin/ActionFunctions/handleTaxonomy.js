import {
    plg_findMany,
    plg_updateOne_queMod_oprMod
} from '../../../utils/Plugs/cms_plugs';

export async function actionFuncs_mirrorAdded({ added = null, cell, fields = null, myprops = null, populate = null, model = null }) {

    const cellkey = Object.keys(cell)[0]
    const cellvalue = Object.values(cell)[0]

    let inQuery
    let inOperator
    let inParams

    let revform = cellkey === 'tagparent' ? 'tagchild' : 'tagparent'

    if (!model) {
        model = cellvalue.fillfields.options.fromconfig.model
    }

    let filteredIds
    if (fields) {
        filteredIds = fields[cellkey]
    } else {
        filteredIds = cellvalue.value
    }

    filteredIds.map(a => a._id);

    inQuery = {
        _id: { "$in": filteredIds },
        country: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.alpha2Code },
        language: { "$eq": myprops.mysite.CurrentMysite.default_language.referenceID.languages[0].iso639_1 },
    }

    let response = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery, populate })

    if (Object.values(response.payload).length > 0) {

        for (const value of Object.values(response.payload)) {

            let MirrorTags_distinct_id = value[revform].map(a => a._id);

            let MirrorTags_Arr = [...MirrorTags_distinct_id]
            let combinedMirrorTags_Arr

            if (MirrorTags_Arr.includes(added.payload._id)) {
                combinedMirrorTags_Arr = [...MirrorTags_Arr]
            } else {
                combinedMirrorTags_Arr = [...MirrorTags_Arr, added.payload._id]
            }

            inQuery = {
                _id: { "$eq": value._id },
            }
            inOperator = {
                "$set": { [revform]: combinedMirrorTags_Arr }
            }

            await plg_updateOne_queMod_oprMod({ model, myprops, actionType: 'samestate', inQuery, inOperator, inParams })
        }
    }
}