import {
    plg_findOne_QueMod
} from '../../components/utils/Plugs/cms_plugs';

export async function storeFuncs_loadList({model = null, dispatch = null, localeuser = null, actionType }) {

    let inQuery = {}
    Object.assign(inQuery, {
        country: { "$eq": localeuser.referenceID.alpha2Code },
        language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
        isdefault: true
    });
    let result_store = await plg_findOne_QueMod({ model, dispatch, actionType, inQuery })

    return result_store.payload
}