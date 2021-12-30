import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'
import {
    plg_updateMany,
    plg_updateOne_queMod_oprMod,
} from '../../../utils/Plugs/cms_plugs';
import { listFuncs_loadList_v2_vh } from '../GenericFuncs/list_funcs_vh'
export async function toggle_addToReferer({ event, value = null, cell = null, sublistkey = null, tiedtoformkey = null, populate = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {

        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let checked = mystate.localStorage.form.formdata[tiedtoformkey].value

        const newChecked = [...checked];

        let newPosition = checked.length + 1

        let insertAr = { referenceID: value, position: newPosition, model, visible: true, quantity: 1 }
        if (newLocalStorage['form']['formdata'][tiedtoformkey].sublist.viewparams.sortOrder === 1) {
            newChecked.push(insertAr)

        } else {
            newChecked.unshift(insertAr)
        }

        newLocalStorage['form']['formdata'][tiedtoformkey].value = [...newChecked]

        let newCheckedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        // newLocalStorage = await listFuncs_loadList_v2({
        //     sublistkey,
        //     model,
        //     myprops,
        //     mystate,
        //     poliglot,
        //     hideIDs: newCheckedIDs,
        //     newLocalStorage,
        //     populate

        // })
    }
    return newLocalStorage

}
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