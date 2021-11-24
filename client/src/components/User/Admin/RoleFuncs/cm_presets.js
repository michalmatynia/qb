import {
    plg_findMany,
    plg_findOne_QueMod
} from '../../../utils/Plugs/cms_plugs';

export async function roleFuncs_presetEvent({ event_lgbinder = null, model = null, myprops = null, newLocalStorage = null }) {
    let inQuery = {
        language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
        country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
        lgbinder: { "$eq": event_lgbinder },

    }
    let match = await plg_findMany({ model, myprops, actionType: 'samestate', inQuery })
    newLocalStorage.attachto[model] = match.payload
    // Find Bricks and populate filter them with reduce to only those that contain rootid

    return newLocalStorage

}
export async function roleFuncs_listEvent({ event_lgbinder = null, myprops = null, inQuery = {} }) {
    // Find Brick with this ID
    Object.assign(inQuery, {
        language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 },
        country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
        lgbinder: { "$eq": event_lgbinder }
    });
    let found = await plg_findOne_QueMod({ model: 'brick', myprops, actionType: 'samestate', inQuery })

    let filtered_ids = found.payload.checked.map(item => item.referenceID)

    inQuery = {
        _id: { "$in": filtered_ids }
    }

    return inQuery
}