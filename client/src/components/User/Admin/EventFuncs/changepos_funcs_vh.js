import { reposFuncs_ChangePosition_vh1 } from '../GenericFuncs/repos_funcs_vh'
import { listFuncs_loadList_v2_vh } from '../GenericFuncs/list_funcs_vh'

export async function changpos_classicAdjust_vh({
    value,
    direction,
    event,
    dispatch,
    poliglot,
    model,
    isViewparams,
    isRawState,
    redux_localeuser
}) {

    if (event) {

        await reposFuncs_ChangePosition_vh1({ item: value, direction, model, dispatch, poliglot, redux_localeuser })

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
