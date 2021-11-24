import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'


export async function loadmore_classicLoad({ event, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let add = 5
        let inLimit = sublistkey ? mystate.localStorage[sublistkey].viewparams.limit : mystate.localStorage.viewparams.limit

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })

        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            inLimit: inLimit + add,
            newLocalStorage
        })


    }
    return newLocalStorage

}