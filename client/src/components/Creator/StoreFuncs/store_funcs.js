import {
    plg_findOne_QueMod
} from '../../utils/Plugs/cms_plugs';

export async function storeFuncs_loadList({model = null, dispatch = null, localeuser = null }) {

    let inQuery = {}
    Object.assign(inQuery, {
        country: { "$eq": localeuser.referenceID.alpha2Code },
        language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
        isdefault: true
    });
    let result_store = await plg_findOne_QueMod({ model, dispatch, actionType: 'samestate', inQuery })

    return result_store.payload

}