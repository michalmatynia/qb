import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
// import { resolvePath, setPath } from '../../../utils/Funcs/basefuncs'
import { nationFuncs_syncDataSet } from '../APIdata/Nations/nation_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'

export async function sync_withAPI({ event, cell = null, sublistkey = null, tiedtoformkey = null, mystate = null, myprops = null, poliglot = null }) {
    let newLocalStorage = { ...mystate.localStorage }

    if (event) {
        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        let viewparams = sublistkey ? mystate.localStorage[sublistkey].viewparams : mystate.localStorage.viewparams

         await nationFuncs_syncDataSet({
            viewparams,
            mystate,
            sublistkey,
            myprops,
            newLocalStorage
        })

        let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage, cell })


        newLocalStorage = await listFuncs_loadList_v2({
            sublistkey,
            model,
            myprops,
            mystate,
            poliglot,
            hideIDs: checkedIDs,
            newLocalStorage
        })


    }
    return newLocalStorage

}