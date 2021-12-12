import {
    plg_updateMany,
    plg_updateOne_queMod_oprMod,
} from '../../../utils/Plugs/cms_plugs';
import { listFuncs_loadList_v2_vh } from '../GenericFuncs/list_funcs_vh'

export async function toggle_boolSwitch_v1_vh({
    value,
    event,
    dispatch,
    poliglot,
    model,
    isViewparams,
    isRawState,
    redux_localeuser
}) {

    if (event) {
        let field = event.target.id
        let checked = !value[field]

        let inQuery
        let inOperator = { '$set': { [field]: checked } }

        if (poliglot) {
            if (value.lgbinder) {
                inQuery = { lgbinder: { "$eq": value.lgbinder } }

                await plg_updateMany({ model, dispatch, actionType: 'samestate', inQuery, inOperator })

            } else {
                inQuery = { _id: { "$eq": value._id } }
                await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', dispatch, inQuery, inOperator })
            }
        } else {
            inQuery = { _id: { "$eq": value._id } }
            await plg_updateOne_queMod_oprMod({ model, actionType: 'samestate', dispatch, inQuery, inOperator })
        }

        await listFuncs_loadList_v2_vh({
            sublistkey: null,
            model,
            redux_localeuser,
            dispatch,
            isRawState,
            thisview: isViewparams,
            populate: isRawState.localStorage.qhelpers.populate,
            hideIDs: null,
            // inQuery
        })

    }

}