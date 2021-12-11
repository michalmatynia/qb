
import { listFuncs_loadList_v2 } from '../GenericFuncs/list_funcs'
import { pre_processCheckedIDs } from './CommonFuncs/pre_funcs'

export async function search_inDatabase({
    blur,
    event,
    sublistkey,
    tiedtoformkey,
    mystate = null,
    myprops = null,
    poliglot,
    newLocalStorage
}) {
    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }
    if (event) {

        let model = sublistkey ? mystate.localStorage[sublistkey].viewmodel : mystate.localStorage.model

        if (!blur) {
            let checkedIDs = await pre_processCheckedIDs({ tiedtoformkey, newLocalStorage })

    }
}

    return newLocalStorage

}