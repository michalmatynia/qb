import {  removeFuncs_delEntityFromDb_v3_vh } from './remove_funcs_vh'
import { reposFuncs_ChangePosition } from './repos_funcs'
import { resolvePath, setPath } from '../../../utils/Funcs/basefuncs'

import { messageCompleted, messageLoading } from './errormsg_funcs'


import {
    plg_findMany
} from '../../../utils/Plugs/cms_plugs';

export async function listFuncs_RemoveItem_v2_vh({dispatch, item = null, removeall = null, model = null, poliglot = null, redux_localeuser, isRawState }) {
    await removeFuncs_delEntityFromDb_v3_vh({dispatch, item, removeall, model, poliglot, redux_localeuser, isRawState,  })

}

export async function listFuncs_loadList_v2_vh({ 
    dispatch,
    sublistkey = null, 
    cell = null, 
    model = null, 
    inLimit = null, 
    inSortOrder = null, 
    inSortBy = null, 
    populate = null, 
    hideIDs = null,
    isRawState,
    redux_localeuser,
    newLocalStorage = null,
    thisview,
    inQuery  = {}
}) {

    if (!newLocalStorage) {
        newLocalStorage = { ...isRawState.localStorage }
    }
    let cellvalue
    let viewpath

    if (cell) {
        cellvalue = Object.values(cell)[0]
    }

    if (!model && cellvalue) {
        model = isRawState.localStorage[cellvalue.sublist.tiedtoelementkey].viewmodel
    }

    if (sublistkey) {
        viewpath = [sublistkey] + '.viewparams'
    } else if (cell) {
        viewpath = cellvalue.sublist.tiedtoelementkey + '.viewparams'
    } else {
        viewpath = 'viewparams'
    }


    if (isRawState.localStorage.poliglot) {
        Object.assign(inQuery, {
            country: { "$eq": redux_localeuser.referenceID.alpha2Code },
            language: { "$eq": redux_localeuser.referenceID.languages[0].iso639_1 }
        });
    }


    if (hideIDs) {
        Object.assign(inQuery, {
            _id: { "$nin": hideIDs },
        });

    }

    let response = await plg_findMany({ viewparams: thisview, model, dispatch, actionType: 'list', inQuery, inLimit, inSortOrder, populate })

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

    return {newLocalStorage, length: Object.keys(response.payload).length } 
}