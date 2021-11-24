import {  removeFuncs_delEntityFromDb_v2 } from './remove_funcs'
import { reposFuncs_ChangePosition } from './repos_funcs'
import { resolvePath, setPath } from '../../../utils/Funcs/basefuncs'

import { messageCompleted, messageLoading } from './errormsg_funcs'


import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function listFuncs_RemoveItem_v2({ item = null, removeall = null, model = null, myprops = null, mystate = null, poliglot = null }) {

    await messageLoading({ myprops })

    await removeFuncs_delEntityFromDb_v2({ item, removeall, model, myprops, mystate, poliglot })

    await messageCompleted({ myprops })

}
export async function listFuncs_adjustPosition_v2({ item = null, direction, model = null, viewparams = null, viewpath = null, mystate = null, myprops = null, inLimit = null, inSortOrder = null, inSortBy = null, poliglot = null, hideIDs = null }) {
    await messageLoading({ myprops })

    await reposFuncs_ChangePosition({ item, direction, model, myprops, mystate, poliglot })

    await messageCompleted({ myprops })

    await listFuncs_loadList_v2({
        viewpath,
        model,
        myprops,
        mystate,
        poliglot,
        viewparams,
        inLimit,
        inSortOrder,
        inSortBy,
        hideIDs
    })
}

export async function listFuncs_loadList_v2({ 
    sublistkey = null, 
    cell = null, 
    model = null, 
    mystate = null, 
    myprops = null, 
    inLimit = null, 
    inSortOrder = null, 
    inSortBy = null, 
    populate = null, 
    poliglot = null, 
    hideIDs = null, 
    newLocalStorage = null,
    inQuery  = {}
}) {

    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }
    let cellvalue
    let viewpath
    let thisview

    if (cell) {
        cellvalue = Object.values(cell)[0]
    }

    if (!model && cellvalue) {
        model = mystate.localStorage[cellvalue.sublist.tiedtoelementkey].viewmodel
    }

    if (sublistkey) {
        viewpath = [sublistkey] + '.viewparams'
    } else if (cell) {
        viewpath = cellvalue.sublist.tiedtoelementkey + '.viewparams'
    } else {
        viewpath = 'viewparams'
    }
    thisview = resolvePath({ object: newLocalStorage, path: viewpath })

    if (poliglot) {

        Object.assign(inQuery, {
            country: { "$eq": myprops.user.localeUser.referenceID.alpha2Code },
            language: { "$eq": myprops.user.localeUser.referenceID.languages[0].iso639_1 }
        });

    }
    if (hideIDs) {
        Object.assign(inQuery, {
            _id: { "$nin": hideIDs },
        });

    }

    let response = await plg_findMany({ viewparams: thisview, model, myprops, actionType: 'list', inQuery, inLimit, inSortOrder, populate })

    if (thisview.size !== Object.keys(response.payload).length) {

        let newSize = Object.keys(response.payload).length

        setPath({ object: newLocalStorage, path: [viewpath] + '.size', value: newSize })

        if (inLimit) {
            setPath({ object: newLocalStorage, path: [viewpath] + '.limit', value: inLimit })
        } else if (inSortOrder) {
            setPath({ object: newLocalStorage, path: [viewpath] + '.sortOrder', value: inSortOrder })
        } else if (inSortBy) {
            setPath({ object: newLocalStorage, path: [viewpath] + '.sortBy', value: inSortBy })
        }
    }

    return newLocalStorage
}
export async function listFuncs_changeSort_v2({ viewparams, sortOrder, sublistkey = null, mystate = null, inSortOrder = null, newLocalStorage = null }) {
    if (!newLocalStorage) {
        newLocalStorage = { ...mystate.localStorage }
    }

    // if (sortOrder === 1) {
    //     inSortOrder = -1
    // } else if (sortOrder === -1) {
    //     inSortOrder = 1
    // }

    if (viewparams.sortOrder === 1) {
        sublistkey ? newLocalStorage[sublistkey].viewparams.sortOrder = -1 : newLocalStorage.viewparams.sortOrder = -1

    } else {
        sublistkey ? newLocalStorage[sublistkey].viewparams.sortOrder = 1 : newLocalStorage.viewparams.sortOrder = 1
    }

    return newLocalStorage

}

